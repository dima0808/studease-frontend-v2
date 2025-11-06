import { useFormContext } from 'react-hook-form';
import '../Essay/Essay.scss';

const MultipleChoices = ({ question }) => {
  const { register, watch } = useFormContext();
  const selected = watch('answers') || [];

  return (
    <div className="question-block">
      <ul className="choice-list">
        {question.answers.map((answer) => (
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
                    (value && value.length > 0) ||
                    'Оберіть хоча б одну відповідь',
                })}
              />
              <span className="checkmark checkbox"></span>
              <span className="label-text">{answer.content}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MultipleChoices;
