import { useFieldArray } from 'react-hook-form';
import FormInput from '@/components/FormInput';
import { typeQuestion } from '@/utils/typeQuestion';
import { Trash2, Plus, XCircle, Check, ListChecks } from 'lucide-react';

import './QuestionBlock.scss';

const QuestionBlock = ({
  index,
  control,
  register,
  errors,
  watch,
  remove,
  setValue,
}) => {
  const type = watch(`questions.${index}.type`);

  const {
    fields: answerFields,
    append: appendAnswer,
    remove: removeAnswer,
  } = useFieldArray({
    control,
    name: `questions.${index}.answers`,
  });

  return (
    <div className="question">
      <div className="question__header">
        <h3 className="question__title">Question {index + 1}</h3>

        <button
          type="button"
          className="question__remove"
          onClick={() => remove(index)}
        >
          <Trash2 size={18} />
        </button>
      </div>

      <FormInput
        label="Question Text"
        name={`questions.${index}.content`}
        type="text"
        placeholder="Enter question text"
        register={register}
        errors={errors}
        rules={{ required: 'Question is required' }}
      />

      <FormInput
        label="Points"
        name={`questions.${index}.points`}
        type="number"
        placeholder="1"
        register={register}
        errors={errors}
        rules={{
          required: 'Points are required',
          min: { value: 1, message: 'Min 1' },
          valueAsNumber: true,
        }}
      />

      <div className="question__field">
        <label className="question__label">Type</label>
        <select
          className="question__select"
          {...register(`questions.${index}.type`)}
        >
          <option value="single_choice">Single Choice</option>
          <option value="multiple_choices">Multiple Choices</option>
          <option value="essay">Essay</option>
          <option value="matching">Matching</option>
        </select>
      </div>

      {(type === 'single_choice' || type === 'multiple_choices') && (
        <div className="answers">
          <div className="answers__header">
            <h4>Answers</h4>
          </div>

          {answerFields.length === 0 && (
            <p className="answers__empty">No answers added yet.</p>
          )}

          {answerFields.map((a, aIndex) => (
            <div key={a.id} className="answer-item">
              <input
                type="text"
                placeholder="Answer text"
                className="answer-item__text"
                {...register(`questions.${index}.answers.${aIndex}.content`)}
              />

              {type === 'multiple_choices' && (
                <input
                  type="checkbox"
                  className="answer-item__check"
                  {...register(
                    `questions.${index}.answers.${aIndex}.isCorrect`,
                    {
                      setValueAs: (v) => Boolean(v),
                    },
                  )}
                />
              )}

              {type === 'single_choice' && (
                <input
                  type="radio"
                  className="answer-item__radio"
                  checked={watch(
                    `questions.${index}.answers.${aIndex}.isCorrect`,
                  )}
                  onChange={() => {
                    answerFields.forEach((_, i) => {
                      setValue(
                        `questions.${index}.answers.${i}.isCorrect`,
                        i === aIndex,
                      );
                    });
                  }}
                />
              )}

              <button
                type="button"
                className="answer-item__remove"
                onClick={() => removeAnswer(aIndex)}
              >
                <XCircle size={18} />
              </button>
            </div>
          ))}

          <button
            type="button"
            className="answers__add"
            onClick={() => appendAnswer(typeQuestion('default'))}
          >
            <Plus size={18} /> Add Answer
          </button>
        </div>
      )}

      {type === 'essay' && (
        <p className="question__note">
          Essay type – student writes a text response.
        </p>
      )}

      {type === 'matching' && (
        <div className="matching">
          <h4>Matching Pairs</h4>

          {answerFields.map((a, aIndex) => (
            <div key={a.id} className="matching__row">
              <input
                type="text"
                placeholder="Left"
                className="matching__input"
                {...register(`questions.${index}.answers.${aIndex}.leftOption`)}
              />
              <input
                type="text"
                placeholder="Right"
                className="matching__input"
                {...register(
                  `questions.${index}.answers.${aIndex}.rightOption`,
                )}
              />

              <button
                type="button"
                className="matching__remove"
                onClick={() => removeAnswer(aIndex)}
              >
                <XCircle size={18} />
              </button>
            </div>
          ))}

          <button
            type="button"
            className="matching__add"
            onClick={() => appendAnswer(typeQuestion('matching'))}
          >
            <Plus size={18} /> Add Pair
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionBlock;
