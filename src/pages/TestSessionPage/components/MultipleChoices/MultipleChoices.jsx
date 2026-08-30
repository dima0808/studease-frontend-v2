import { useFormContext } from 'react-hook-form';
import { answerLetter } from '@/utils/answerLetter';
import '../SingleChoice/Choice.scss';

const MultipleChoices = ({ question }) => {
  const { register, watch } = useFormContext();
  const selected = watch('answers') || [];

  return (
    <div className="question-block">
      <ul className="choice-list">
        {question.answers.map((answer, index) => (
          <li
            key={answer.id}
            className={`choice-item ${selected.includes(String(answer.id)) ? 'active' : ''}`}
          >
            <label>
              <input
                type="checkbox"
                value={answer.id}
                {...register('answers', {
                  validate: (value) =>
                    (value && value.length > 0) || 'Choose an answer to continue',
                })}
              />
              <span className="choice-letter">{answerLetter(index)}</span>
              <span className="label-text">{answer.content}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MultipleChoices;
