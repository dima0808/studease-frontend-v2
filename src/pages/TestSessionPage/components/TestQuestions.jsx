import { useSelector } from 'react-redux';
import { useActions } from '@/hooks/useActions';

const questions = [
  { id: 1, text: 'Столиця України?', options: ['Львів', 'Київ', 'Одеса'] },
  {
    id: 2,
    text: 'Коли Україна здобула незалежність?',
    options: ['1990', '1991', '1992'],
  },
];

const TestQuestions = () => {
  const { saveAnswer, finishTest } = useActions();
  const answers = useSelector((state) => state.testSession.answers);

  const currentQuestion = questions[answers.length];

  const handleAnswer = (option) => {
    saveAnswer({ questionId: currentQuestion.id, answer: option });
    if (answers.length + 1 === questions.length) finishTest();
  };

  if (!currentQuestion)
    return <h3>✅ Тест завершено! Дякуємо за проходження.</h3>;

  return (
    <div className="test-questions">
      <h3>{currentQuestion.text}</h3>
      {currentQuestion.options.map((option) => (
        <button key={option} onClick={() => handleAnswer(option)}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default TestQuestions;
