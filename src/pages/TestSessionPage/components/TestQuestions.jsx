import Timer from '@/components/Timer';
import { useSelector } from 'react-redux';
import { useActions } from '@/hooks/useActions.js';
import { Client } from '@stomp/stompjs';
import { useEffect, useState } from 'react';
import { WS_URL } from '@/constants/config.js';

const TestQuestions = () => {
  const {
    question,
    testInfo,
    testSession,
    credentials,
    answerIds,
    answerContent,
  } = useSelector((state) => state.testSession);

  const {
    toggleAnswerId,
    getNextQuestion,
    finishTestSession,
    forceEndTestSession,
  } = useActions();

  const [seconds, setSeconds] = useState(0);

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

  if (!testSession) {
    return <div>No Test Session</div>;
  }

  return (
    <div className="test-questions">
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{
            width: `${Math.round(
              (testSession.currentQuestionIndex * 100) /
                testInfo.questionsCount,
            )}%`,
          }}
        ></div>
      </div>

      <Timer seconds={seconds} />

      <p className="progress-text">
        Question {testSession.currentQuestionIndex + 1} of{' '}
        {testInfo.questionsCount}
      </p>

      <h3>{question.content}</h3>
      <div className="options">
        {question.type === 'single_choice' &&
          question.answers.map((answer) => (
            <label key={answer.id} className="option">
              <input
                type="radio"
                name="single-choice"
                checked={answerIds.includes(answer.id)}
                onChange={() =>
                  toggleAnswerId({
                    answerId: answer.id,
                    isSingleChoice: true,
                  })
                }
              />
              <span className="custom-radio"></span>
              <span>{answer.content}</span>
            </label>
          ))}

        {question.type === 'multiple_choices' &&
          question.answers.map((answer) => (
            <label key={answer.id} className="option">
              <input
                type="checkbox"
                name="multiple-choice"
                checked={answerIds.includes(answer.id)}
                onChange={() =>
                  toggleAnswerId({
                    answerId: answer.id,
                    isSingleChoice: false,
                  })
                }
              />
              <span className="custom-checkbox"></span>
              <span>{answer.content}</span>
            </label>
          ))}
      </div>

      {testSession.currentQuestionIndex + 1 < testInfo.questionsCount ? (
        <button
          onClick={() =>
            getNextQuestion({
              testId: testInfo.id,
              credentials,
              answerIds,
              answerContent,
            })
          }
        >
          Next
        </button>
      ) : (
        <button
          onClick={() =>
            finishTestSession({
              testId: testInfo.id,
              credentials,
              answerIds,
              answerContent,
            })
          }
        >
          Finish
        </button>
      )}
    </div>
  );
};

export default TestQuestions;
