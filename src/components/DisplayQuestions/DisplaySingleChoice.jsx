import './DisplayChoice.scss';

const DisplaySingleChoice = ({ question }) => {
  return (
    <div className="display-question-block">
      <div className="display-question-header">
        <span className="display-question-type">Single choice</span>
      </div>
      <h3 className="display-question-title">{question.content}</h3>
      <ul className="display-choice-list">
        {question.answers.map((answer) => (
          <li
            key={answer.id}
            className={`display-choice-item ${answer.isCorrect ? 'selected' : ''}`}
          >
            <span
              className={`radio-indicator ${answer.isCorrect ? 'checked' : ''}`}
            />
            <span className="label-text">{answer.content}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplaySingleChoice;
