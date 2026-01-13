import './DisplayChoice.scss';

const DisplayMultipleChoice = ({ question, showResults = false }) => {
  const isEntirelyCorrect = showResults && question.answers.every(
    (a) => a.isCorrect === a.userSelected
  );

  const containerClass = `display-question-block ${
    showResults ? (isEntirelyCorrect ? 'is-correct' : 'is-incorrect') : ''
  }`;

  return (
    <div className={containerClass}>
      <div className="display-question-header">
        <span className="display-question-type">Multiple choices</span>
      </div>
      <h3 className="display-question-title">{question.content}</h3>
      <ul className="display-choice-list">
        {question.answers.map((answer) => {
          const isSelected = answer.userSelected;
          const isCorrect = answer.isCorrect;

          let statusClass = "";
          if (showResults) {
            if (isSelected && isCorrect) statusClass = "status-correct";
            else if (isSelected && !isCorrect) statusClass = "status-error";
            else if (!isSelected && isCorrect) statusClass = "status-missed";
          }

          return (
            <li key={answer.id} className={`display-choice-item ${statusClass}`}>
              <span className={`checkbox-indicator ${isSelected ? 'checked' : ''} ${showResults && isSelected && !isCorrect ? 'incorrect' : ''}`} />
              <span className="label-text">{answer.content}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DisplayMultipleChoice;