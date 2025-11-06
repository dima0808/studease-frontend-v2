import Timer from '@/components/Timer';
import { useSelector } from 'react-redux';
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

const TestQuestions = () => {
  const {
    question,
    testInfo,
    testSession,
    credentials,
    errorStartTest,
    isLoadingTestSession,
  } = useSelector((s) => s.testSession);
  const { getNextQuestion, finishTestSession, forceEndTestSession } =
    useActions();
  const [seconds, setSeconds] = useState(0);

  const methods = useForm({ defaultValues: { answers: [] } });
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const onTestMessageReceived = (wsMessage) => {
    const { type, timeLeft, testSession } = JSON.parse(wsMessage.body);
    switch (type) {
      case 'TIMER':
        setSeconds(timeLeft);
        break;
      case 'FORCE_END':
        forceEndTestSession(testSession);
        break;
    }
  };

  useEffect(() => {
    if (!testSession?.sessionId) {
      return;
    }

    let subscription = null;
    const stompClient = new Client({
      brokerURL: WS_URL,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('[WS] WebSocket Connected');
        subscription = stompClient.subscribe(
          '/queue/testSession/' + testSession.sessionId,
          onTestMessageReceived,
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
      if (stompClient) {
        if (subscription) {
          subscription.unsubscribe();
        }
        stompClient.deactivate().then();
      }
    };
  }, [testSession?.sessionId]);

  if (isLoadingTestSession) {
    return <Loading text="test" />;
  }

  if (!testSession) {
    const reloadPage = () => window.location.reload();

    return (
      <ErrorTest
        onReload={reloadPage}
        message={`${errorStartTest ? `${errorStartTest}.` : 'An unexpected error occurred while starting the test.'} Please reload the page to try again.`}
        showErrorText={false}
        image={image}
        buttonText="Reload Page"
      />
    );
  }

  const onSubmit = (data) => {
    const answerIds = Array.isArray(data.answers)
      ? data.answers
      : [data.answers];
    const answerContent = data.answerContent || null;
    const payload = {
      testId: testInfo.id,
      credentials,
      answerIds,
      answerContent,
    };

    if (testSession.currentQuestionIndex + 1 < testInfo.questionsCount) {
      getNextQuestion(payload);
    } else {
      finishTestSession(payload);
    }
  };

  return (
    <FormProvider {...methods}>
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
              width: `${Math.round(
                (testSession.currentQuestionIndex * 100) /
                  testInfo.questionsCount,
              )}%`,
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
                : question.type === 'single_choice'
                  ? 'Single Choice'
                  : question.type === 'multiple_choices'
                    ? 'Multiple Choices'
                    : 'Essay'}
          </p>
          <p className="progress-text">
            Question {testSession.currentQuestionIndex + 1} of{' '}
            {testInfo.questionsCount}
          </p>
        </div>

        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            reset({ answers: [], answerContent: null });
          }}
        >
          <Motion.div
            key={testSession.currentQuestionIndex}
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
              text={
                testSession.currentQuestionIndex + 1 < testInfo.questionsCount
                  ? 'Next'
                  : 'Finish'
              }
              type="submit"
            />
          </Motion.div>
        </AnimatePresence>
      </form>
    </FormProvider>
  );
};

export default TestQuestions;
