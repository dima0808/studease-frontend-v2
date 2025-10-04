import { useFieldArray } from "react-hook-form";
import FormInput from "@/components/FormInput";
import { typeQuestion } from "@/utils/typeQuestion";
import React from "react";

const QuestionBlock = ({ q, index, control, register, errors, watch, remove, setValue }) => {
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
    <div style={{ border: "1px solid #ccc", padding: 10, marginBottom: 20 }}>
      <FormInput
        label={`Question ${index + 1}`}
        name={`questions.${index}.content`}
        type="text"
        placeholder="Enter question text"
        register={register}
        errors={errors}
        rules={{ required: "Question is required" }}
      />

      <FormInput
        label="Points"
        name={`questions.${index}.points`}
        type="number"
        placeholder="1"
        register={register}
        errors={errors}
        rules={{ required: "Points are required", min: { value: 1, message: "Min 1" }, valueAsNumber: true, }}
      />

      <div>
        <label>Type</label>
        <select {...register(`questions.${index}.type`)}>
          <option value="single_choice">Single Choice</option>
          <option value="multiple_choices">Multiple Choices</option>
          <option value="essay">Essay</option>
          <option value="matching">Matching</option>
        </select>
      </div>

      {/* Answers */}
      {(type === "single_choice" || type === "multiple_choices") && (
        <div>
          <h4>Answers</h4>
          {answerFields.length === 0 && <p>No answers added yet.</p>}
          {answerFields.map((a, aIndex) => (
            <div key={a.id} style={{ marginBottom: 10 }}>
              <input
                type="text"
                placeholder="Answer text"
                {...register(`questions.${index}.answers.${aIndex}.content`)}
              />
              {type === "multiple_choices" && (
                <input
                  type="checkbox"
                  {...register(`questions.${index}.answers.${aIndex}.isCorrect`, {
                    setValueAs: v => Boolean(v),
                  })}
                />
              )}
              {type === "single_choice" && (
                <input
                  type="radio"
                  checked={watch(`questions.${index}.answers.${aIndex}.isCorrect`)}
                  onChange={() => {
                    answerFields.forEach((_, i) => {
                      setValue(`questions.${index}.answers.${i}.isCorrect`, i === aIndex);
                    });
                  }}
                />
              )}
              <button type="button" onClick={() => removeAnswer(aIndex)}>Remove</button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendAnswer(typeQuestion("default"))}
          >
            Add Answer
          </button>
        </div>
      )}

      {type === "essay" && (
        <p>Essay type – no predefined answers, student writes text.</p>
      )}

      {type === "matching" && (
        <div>
          <h4>Matching Pairs</h4>
          {answerFields.map((a, aIndex) => (
            <div key={a.id} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <input
                type="text"
                placeholder="Left option"
                {...register(`questions.${index}.answers.${aIndex}.leftOption`)}
              />
              <input
                type="text"
                placeholder="Right option"
                {...register(`questions.${index}.answers.${aIndex}.rightOption`)}
              />
              <button type="button" onClick={() => removeAnswer(aIndex)}>Remove</button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendAnswer(typeQuestion("matching"))}
          >
            Add Pair
          </button>
        </div>
      )}

      <button type="button" onClick={() => remove(index)}>Remove Question</button>
    </div>
  );
};

export default QuestionBlock;
