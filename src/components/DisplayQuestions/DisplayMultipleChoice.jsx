import classNames from 'classnames';
import { answerLetter } from '@/utils/answerLetter';
import './DisplayChoice.scss';

const DisplayMultipleChoice = ({ question, showResults = false }) => {
  return (
    <div className="display-question-block">
      <div className="display-question-header">
        <span className="display-question-type">Multiple choice</span>
      </div>
      <h3 className="display-question-title">{question.content}</h3>
      <ul className="display-choice-list">
        {question.answers.map((answer, index) => {
          const isSelected = answer.userSelected;
          const isCorrect = answer.isCorrect;

          return (
            <li
              key={answer.id}
              className={classNames('display-choice-item', {
                'is-selected': isSelected,
                'status-error': showResults && isSelected && !isCorrect,
                'status-missed': showResults && !isSelected && isCorrect,
              })}
            >
              <span className="choice-letter">{answerLetter(index)}</span>
              <span className="label-text">{answer.content}</span>
              {showResults && !isSelected && isCorrect && (
                <span className="display-choice-item__note">Also right</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DisplayMultipleChoice;
