import { useFormContext } from 'react-hook-form';
import './Essay.scss';

const Essay = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="essay-block">
      <div className="textarea-wrapper">
        <textarea
          className={`textarea ${errors.answerContent ? 'error' : ''}`}
          placeholder="Type your answer here..."
          {...register('answerContent', {
            required: 'Please write something before continuing',
            minLength: {
              value: 10,
              message: 'Answer must be at least 10 characters long',
            },
            onChange: (e) => setValue('answerContent', e.target.value),
          })}
        />
      </div>
    </div>
  );
};

export default Essay;
