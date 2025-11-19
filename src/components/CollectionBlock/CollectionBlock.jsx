import './CollectionBlock.scss';
import FormInput from '@/components/FormInput';
import { Trash2 } from 'lucide-react';
import React from 'react';

const CollectionBlock = ({
  register,
  index,
  collections,
  errors,
  delCollection,
}) => {
  return (
    <div className="collection">
      <div className="collection__header">
        <h3 className="collection__title">Collection #{index + 1}</h3>

        <button
          type="button"
          className="collection__remove"
          onClick={() => delCollection(index)}
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="collection__field">
        <label className="collection__label">Collection Name</label>

        <select
          className="collection__select"
          defaultValue=""
          {...register(`samples.${index}.collectionId`, {
            required: 'Collection is required',
          })}
        >
          <option value="" disabled>
            Select a collection
          </option>

          {collections.map((collection) => (
            <option key={collection.id} value={collection.id}>
              {collection.name} (Questions: {collection.questionsCount})
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
        label="Points"
        name={`samples.${index}.points`}
        type="number"
        placeholder="Points for completing the collection"
        register={register}
        errors={errors}
        rules={{
          required: 'Points are required',
          min: { value: 1, message: 'Must be at least 1 point' },
          valueAsNumber: true,
        }}
      />

      <FormInput
        label="Questions Count"
        name={`samples.${index}.questionsCount`}
        type="number"
        placeholder="Number of questions to take from collection"
        register={register}
        errors={errors}
        rules={{
          required: 'Questions count is required',
          min: { value: 1, message: 'Must be at least 1 question' },
          valueAsNumber: true,
        }}
      />
    </div>
  );
};

export default CollectionBlock;
