import { useSelector } from 'react-redux';
import { useActions } from '@/hooks/useActions';
import Timer from '@/components/Timer';

const TestQuestions = () => {
  const { saveAnswer, finishTest } = useActions();
  const { answers, questions } = useSelector((state) => state.testSession);

  const currentQuestion = questions[answers.length];
  const progress = Math.round((answers.length / questions.length) * 100);

  const handleAnswer = (option) => {
    saveAnswer({ questionId: currentQuestion.id, answer: option });
    if (answers.length + 1 === questions.length) finishTest();
  };

  const handleTimeUp = () => {
    finishTest();
  };

  if (!currentQuestion) return <h3>Test finished!</h3>;

  return (
    <div className="test-questions">
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      <Timer minutes={1} onTimeUp={handleTimeUp} />

      <p className="progress-text">
        Question {answers.length + 1} of {questions.length}
      </p>

      <h3>{currentQuestion.text}</h3>
      <div className="options">
        {currentQuestion.options.map((option) => (
          <button key={option} onClick={() => handleAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TestQuestions;
