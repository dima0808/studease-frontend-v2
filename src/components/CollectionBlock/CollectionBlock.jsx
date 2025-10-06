import './CollectionBlock.scss'
import FormInput from "@/components/FormInput";
import React from "react";

const CollectionBlock = (props) => {
  const {
    register,
    index,
    collections,
    errors,
    delCollection,

  } = props
  return (
    <div style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
      <div className="form-input">
        <label>Collection Name</label>
        <select
          {...register(`samples.${index}.collectionName`, { required: "Collection is required" })}
          defaultValue=""
        >
          <option value="" disabled>
            Select a collection
          </option>
          {collections.map((collection) => (
            <option key={collection.name} value={collection.name}>
              {collection.name} (Questions: {collection.questionsCount})
            </option>
          ))}
        </select>
        {errors.samples && errors.samples[index] && errors.samples[index].collectionName && (
          <p style={{ color: "red" }}>{errors.samples[index].collectionName.message}</p>
        )}

        <FormInput
          label="Points"
          name={`samples.${index}.points`}
          type="number"
          placeholder="Points for completing the collection"
          register={register}
          errors={errors}
          rules={{
            required: "Points are required",
            min: { value: 1, message: "Must be at least 1 point" },
            valueAsNumber: true,
          }}
        />
        <FormInput
          label="Questions Count"
          name={`samples.${index}.questionsCount`}
          type="number"
          placeholder="Number of questions to include from the collection"
          register={register}
          errors={errors}
          rules={{
            required: "Questions count is required",
            min: { value: 1, message: "Must be at least 1 question" },
            valueAsNumber: true,
          }}
        />
        <button type="button" onClick={() => delCollection(index)}>Delete Collection</button>
      </div>
    </div>
  )
}

export default CollectionBlock