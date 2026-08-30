import Timer from '@/components/Timer';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useActions } from '@/hooks/useActions.js';
import { Client } from '@stomp/stompjs';
import { useEffect, useState } from 'react';
import { WS_URL } from '@/constants/config.js';
import { useForm, FormProvider } from 'react-hook-form';
import MultipleChoices from '../components/MultipleChoices';
import Essay from '../components/Essay';
import SingleChoice from '@/pages/TestSessionPage/components/SingleChoice';
import Button from '@/components/Button';
import TickStrip from '@/components/TickStrip';
import AttemptBar from '@/pages/TestSessionPage/components/AttemptBar';
import { ArrowRight } from 'lucide-react';
import classNames from 'classnames';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import image from '@/assets/icons/error.svg';
import ErrorTest from '@/components/ErrorTest';
import MatchPairs from '@/pages/TestSessionPage/components/MatchPairs';
import Loading from '@/components/Loading';
import { readAttempt } from '@/utils/attemptToken';
import { useAttemptCountdown } from '@/hooks/useAttemptCountdown';
import NotificationErrorMessage from '@/components/NotificationErrorMessage';

const QUESTION_TYPE_LABEL = {
  single_choice: 'Single choice',
  multiple_choices: 'Multiple choice',
  matching: 'Matching pairs',
  essay: 'Essay',
};

const pad = (value) => String(value).padStart(2, '0');

const TestQuestions = () => {
  const {
    currentQuestion,
    testInfo,
    sessionKey,
    endsAt,
    attemptError,
    isLoadingTestSession,
  } = useSelector((s) => s.testSession);
  const {
    getNextQuestion,
    finishTestSession,
    forceEndTestSession,
    clearAttemptError,
  } = useActions();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [seconds, resyncCountdown] = useAttemptCountdown(endsAt);
  // The route param, not `testInfo.id` — it is what the attempt token is keyed
  // by, so the two must not be allowed to drift apart.
  const { testId } = useParams();

  const methods = useForm({ defaultValues: { answers: [] } });
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const question = currentQuestion?.question;
  const questionNumber = currentQuestion?.questionNumber ?? 0;
  const totalQuestions =
    currentQuestion?.totalQuestions ?? testInfo?.questionsCount ?? 0;
  const isLastQuestion = questionNumber >= totalQuestions;

  useEffect(() => {
    const attempt = readAttempt(testId);
    if (!sessionKey || !attempt) {
      return;
    }

    const onTestMessageReceived = (wsMessage) => {
      const { type, timeLeft, testSession } = JSON.parse(wsMessage.body);
      switch (type) {
        case 'TIMER':
          // A resync, not a tick — the countdown runs locally off `endsAt`.
          resyncCountdown(timeLeft);
          break;
        case 'FORCE_END':
          forceEndTestSession(testSession);
          break;
      }
    };

    let subscription = null;
    const stompClient = new Client({
      brokerURL: WS_URL,
      reconnectDelay: 5000,
      // The server remembers a token given at CONNECT; it is also sent on the
      // SUBSCRIBE frame below. Either alone is enough.
      connectHeaders: { 'X-Attempt-Token': attempt.attemptToken },
      onConnect: () => {
        console.log('[WS] WebSocket Connected');
        subscription = stompClient.subscribe(
          `/topic/testSession/${sessionKey}`,
          onTestMessageReceived,
          { 'X-Attempt-Token': attempt.attemptToken },
        );
      },
      onWebSocketClose: () => {
        console.log('[WS] WebSocket Closed');
      },
      onWebSocketError: (event) => {
        console.error('[WS] WebSocket Error', event);
      },
      onStompError: (frame) => {
        console.error('[WS] Stomp Error', frame.headers['message']);
        console.error('[WS] Full frame:', frame);
      },
    });
    stompClient.activate();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
      stompClient.deactivate().then();
    };
  }, [sessionKey, testId, resyncCountdown, forceEndTestSession]);

  if (isLoadingTestSession) {
    return <Loading text="test" />;
  }

  if (!currentQuestion) {
    const reloadPage = () => window.location.reload();

    return (
      <ErrorTest
        onReload={reloadPage}
        message={`${attemptError ? `${attemptError}.` : 'An unexpected error occurred while starting the test.'} Please reload the page to try again.`}
        showErrorText={false}
        image={image}
        buttonText="Reload page"
      />
    );
  }

  const onSubmit = (data) => {
    if (isSubmitting) return;

    const rawAnswers = Array.isArray(data.answers)
      ? data.answers
      : [data.answers];
    const answerIds = rawAnswers
      .filter((id) => id !== undefined && id !== null && id !== '')
      .map(Number);
    const answerContent = data.answerContent?.trim() || null;

    const payload = {
      testId,
      // Binds the answer to the question it was written for, so a retried or
      // double-submitted request updates it instead of sliding onto the next.
      responseEntryId: currentQuestion.responseEntryId,
      answerIds,
      answerContent,
    };

    const submitAction = isLastQuestion ? finishTestSession : getNextQuestion;

    setIsSubmitting(true);
    submitAction(payload).finally(() => setIsSubmitting(false));
  };

  // Skipping is answering with nothing — the server keeps the entry unanswered
  // so the question can come back to the student later.
  const onSkip = () => {
    if (isSubmitting || isLastQuestion) return;

    setIsSubmitting(true);
    getNextQuestion({
      testId,
      responseEntryId: currentQuestion.responseEntryId,
      answerIds: [],
      answerContent: null,
    }).finally(() => setIsSubmitting(false));
  };

  const hasError = !!errors.answers || !!errors.answerContent;
  const answered = Math.max(questionNumber - 1, 0);
  const toGo = Math.max(totalQuestions - answered, 0);

  const typeLine = hasError
    ? errors.answerContent?.message ||
      errors.answers?.message ||
      'Choose an answer to continue'
    : `${QUESTION_TYPE_LABEL[question.type] ?? 'Question'}${
        question.points ? ` · ${question.points} points` : ''
      }`;

  return (
    <FormProvider {...methods}>
      {/* A submission that failed without costing us the attempt — a rejected
          answer or a rate limit that outlasted its backoff. The question stays
          on screen so the student can simply try again. */}
      <NotificationErrorMessage
        message={attemptError}
        onClose={clearAttemptError}
        duration={5000}
      />
      <form className="test-questions" onSubmit={handleSubmit(onSubmit)}>
        <AttemptBar ruled>
          <div className="attempt__bar-right">
            <span className="attempt__saved">Saved just now</span>
            <Timer seconds={seconds} />
          </div>
        </AttemptBar>

        <div className="attempt__body">
          <div className="attempt__content">
            <div className="test-questions__head">
              <span className="test-questions__index">
                {pad(questionNumber)} / {pad(totalQuestions)}
              </span>
              <span
                className={classNames('test-questions__type', {
                  'test-questions__type--error': hasError,
                })}
              >
                {typeLine}
              </span>
            </div>

            <AnimatePresence
              mode="wait"
              onExitComplete={() => {
                reset({ answers: [], answerContent: null });
              }}
            >
              <Motion.div
                key={currentQuestion.responseEntryId}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <h2 className="test-questions__title">{question.content}</h2>

                <div className="test-questions__answers">
                  {question.type === 'single_choice' && (
                    <SingleChoice question={question} />
                  )}
                  {question.type === 'multiple_choices' && (
                    <MultipleChoices question={question} />
                  )}
                  {question.type === 'essay' && <Essay question={question} />}
                  {question.type === 'matching' && (
                    <MatchPairs question={question} />
                  )}
                </div>
              </Motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="attempt__footer">
          <div className="test-questions__progress">
            <TickStrip
              total={totalQuestions}
              answered={answered}
              current={questionNumber}
            />
            <span className="test-questions__count">
              {answered} answered · {toGo} to go
            </span>
          </div>

          <div className="test-questions__actions">
            {!isLastQuestion && (
              <button
                type="button"
                className="attempt-link attempt-link--quiet"
                onClick={onSkip}
                disabled={isSubmitting}
              >
                Skip for now
              </button>
            )}
            <Button
              theme="primary"
              size="lg"
              icon={ArrowRight}
              iconSize={18}
              iconPosition="end"
              text={isLastQuestion ? 'Finish' : 'Next question'}
              type="submit"
              disabled={isSubmitting}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default TestQuestions;
