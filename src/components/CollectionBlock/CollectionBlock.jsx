import './CollectionBlock.scss';
import FormInput from '@/components/FormInput';
import { Trash2 } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

const CollectionBlock = ({
  register,
  index,
  collections,
  errors,
  delCollection,
}) => {
  const { t } = useTranslation();

  return (
    <div className="collection">
      <div className="collection__header">
        <h3 className="collection__title">
          {t('create.collectionBlock.title', { number: index + 1 })}
        </h3>

        <button
          type="button"
          className="collection__remove"
          onClick={() => delCollection(index)}
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="collection__field">
        <label className="collection__label">
          {t('create.collectionBlock.name')}
        </label>

        <select
          className="collection__select"
          defaultValue=""
          {...register(`samples.${index}.collectionId`, {
            required: t('create.collectionBlock.required'),
          })}
        >
          <option value="" disabled>
            {t('create.collectionBlock.selectPlaceholder')}
          </option>

          {collections.map((collection) => (
            <option key={collection.id} value={collection.id}>
              {t('create.collectionBlock.option', {
                name: collection.name,
                count: collection.questionsCount,
              })}
            </option>
          ))}
        </select>

        {errors.samples &&
          errors.samples[index] &&
          errors.samples[index].collectionId && (
            <p className="collection__error">
              {errors.samples[index].collectionId.message}
            </p>
          )}
      </div>

      {/* Points */}
      <FormInput
        label={t('create.collectionBlock.points')}
        name={`samples.${index}.points`}
        type="number"
        register={register}
        errors={errors}
        rules={{
          required: t('create.collectionBlock.pointsRequired'),
          min: { value: 1, message: t('create.collectionBlock.minPoints') },
          valueAsNumber: true,
        }}
      />

      <FormInput
        label={t('create.collectionBlock.questionsCount')}
        name={`samples.${index}.questionsCount`}
        type="number"
        register={register}
        errors={errors}
        rules={{
          required: t('create.collectionBlock.questionsCountRequired'),
          min: {
            value: 1,
            message: t('create.collectionBlock.minQuestions'),
          },
          valueAsNumber: true,
        }}
      />
    </div>
  );
};

export default CollectionBlock;
