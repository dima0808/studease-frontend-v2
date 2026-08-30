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
  single_choice: 'Single Choice',
  multiple_choices: 'Multiple Choices',
  matching: 'Matching',
  essay: 'Essay',
};

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
      <form
        className={classNames('test-questions', {
          error: !!errors.answers || !!errors.answerContent,
        })}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{
              width: `${
                totalQuestions
                  ? Math.round(((questionNumber - 1) * 100) / totalQuestions)
                  : 0
              }%`,
            }}
          />
        </div>

        <Timer seconds={seconds} />

        <div className="progress-info">
          <p
            className={classNames('question-type', {
              error: !!errors.answers || !!errors.answerContent,
            })}
          >
            {errors.answerContent
              ? errors.answerContent.message
              : errors.answers
                ? 'Please select an answer'
                : (QUESTION_TYPE_LABEL[question.type] ?? 'Question')}
          </p>
          <p className="progress-text">
            Question {questionNumber} of {totalQuestions}
          </p>
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
            <h3>{question.content}</h3>

            {question.type === 'single_choice' && (
              <SingleChoice question={question} />
            )}
            {question.type === 'multiple_choices' && (
              <MultipleChoices question={question} />
            )}
            {question.type === 'essay' && <Essay question={question} />}
            {question.type === 'matching' && <MatchPairs question={question} />}

            <Button
              className="question-block__button"
              theme="primary"
              text={isLastQuestion ? 'Finish' : 'Next'}
              type="submit"
              disabled={isSubmitting}
            />
          </Motion.div>
        </AnimatePresence>
      </form>
    </FormProvider>
  );
};

export default TestQuestions;
