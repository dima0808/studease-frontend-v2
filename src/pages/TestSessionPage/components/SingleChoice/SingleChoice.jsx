import { useFormContext } from 'react-hook-form';
import { answerLetter } from '@/utils/answerLetter';
import './Choice.scss';

const SingleChoice = ({ question }) => {
  const { register, watch } = useFormContext();
  const selected = watch('answers');

  return (
    <div className="question-block">
      <ul className="choice-list">
        {question.answers.map((answer, index) => (
          <li
            key={answer.id}
            className={`choice-item ${selected === String(answer.id) ? 'active' : ''}`}
          >
            <label>
              <input
                type="radio"
                value={answer.id}
                {...register('answers', { required: true })}
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

export default SingleChoice;
