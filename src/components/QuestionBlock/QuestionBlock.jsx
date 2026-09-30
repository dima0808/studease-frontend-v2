import { useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
        <h3 className="question__title">
          {t('create.question.title', { number: index + 1 })}
        </h3>

        <button
          type="button"
          className="question__remove"
          onClick={() => remove(index)}
        >
          <Trash2 size={18} />
        </button>
      </div>

      <FormInput
        label={t('create.question.text')}
        name={`questions.${index}.content`}
        type="text"
        register={register}
        errors={errors}
        rules={{ required: t('create.question.textRequired') }}
      />

      <FormInput
        label={t('create.question.points')}
        name={`questions.${index}.points`}
        type="number"
        register={register}
        errors={errors}
        rules={{
          required: t('create.question.pointsRequired'),
          min: { value: 1, message: t('create.question.minPointsShort') },
          valueAsNumber: true,
        }}
      />

      <div className="question__field">
        <label className="question__label">{t('create.question.type')}</label>
        <select
          className="question__select"
          {...register(`questions.${index}.type`)}
        >
          <option value="single_choice">
            {t('create.questionTypes.single_choice')}
          </option>
          <option value="multiple_choices">
            {t('create.questionTypes.multiple_choices')}
          </option>
          <option value="essay">{t('create.questionTypes.essay')}</option>
          <option value="matching">
            {t('create.questionTypes.matching')}
          </option>
        </select>
      </div>

      {(type === 'single_choice' || type === 'multiple_choices') && (
        <div className="answers">
          <div className="answers__header">
            <h4>{t('create.question.answers')}</h4>
          </div>

          {answerFields.length === 0 && (
            <p className="answers__empty">
              {t('create.question.answersEmpty')}
            </p>
          )}

          {answerFields.map((a, aIndex) => (
            <div key={a.id} className="answer-item">
              <input
                type="text"
                placeholder={t('create.question.answerPlaceholder')}
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
            <Plus size={18} /> {t('create.question.addAnswer')}
          </button>
        </div>
      )}

      {type === 'essay' && (
        <p className="question__note">{t('create.question.essayNote')}</p>
      )}

      {type === 'matching' && (
        <div className="matching">
          <h4>{t('create.question.matchingPairs')}</h4>

          {answerFields.map((a, aIndex) => (
            <div key={a.id} className="matching__row">
              <input
                type="text"
                placeholder={t('create.question.left')}
                className="matching__input"
                {...register(`questions.${index}.answers.${aIndex}.leftOption`)}
              />
              <input
                type="text"
                placeholder={t('create.question.right')}
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
            <Plus size={18} /> {t('create.question.addPair')}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionBlock;
