import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useActions } from "@/hooks/useActions";
import { ROUTES } from "@/constants/routes";
import BackButton from "@/components/BackButton";
import FormInput from "@/components/FormInput";
import QuestionBlock from "@/components/QuestionBlock";
import SidebarCreation from "@/components/SidebarCreation";

const defaultQuestion = {
  id: Date.now(),
  content: "",
  points: 1,
  type: "single_choice",
  answers: [],
};

const defaultValues = {
  name: "",
  openDate: "",
  deadline: "",
  minutesToComplete: "",
  questions: [],
  samples: [],
};

const CreateTestForm = () => {
  const [params] = useSearchParams();
  const cloneId = params.get("cloneId");
  const { getFullTestById, createTest } = useActions();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  useEffect(() => {
    if (cloneId) {
      (async () => {
        try {
          const data = await getFullTestById(cloneId).unwrap();

          const filteredData = Object.keys(defaultValues).reduce((acc, key) => {
            if (data[key] !== undefined) {
              acc[key] = data[key];
            }
            return acc;
          }, {});

          if (Array.isArray(filteredData.questions)) {
            filteredData.questions = filteredData.questions.map((q) => {
              if (q.type === "matching" && Array.isArray(q.answers)) {
                return {
                  ...q,
                  answers: q.answers
                    .filter((a) => a.isCorrect === true)
                    .map(({ leftOption, rightOption }) => ({
                      leftOption,
                      rightOption,
                    })),
                };
              }
              return q;
            });
          }

          const newData = {
            ...defaultValues,
            ...filteredData,
            name: (filteredData.name || "") + " (Copy)",
          };

          reset(newData);
        } catch (err) {
          console.error("Failed to fetch test:", err);
        }
      })();
    }
  }, [cloneId, getFullTestById, reset]);

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    createTest(data);
    // reset();
    // navigate(`/${ROUTES.TESTS}`);
  };

  return (
    <>
      <SidebarCreation
        addQuestion={() => append({ ...defaultQuestion, id: Date.now() })}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: 800, margin: "0 auto" }}
      >
        <FormInput
          label="Test Name"
          name="name"
          type="text"
          placeholder="Java Basics Test 9"
          register={register}
          errors={errors}
          rules={{ required: "Name is required" }}
        />

        <FormInput
          label="Open Date"
          name="openDate"
          type="text"
          placeholder="20.09.2025 12:00"
          register={register}
          errors={errors}
          rules={{
            required: "Open date is required",
            pattern: {
              value: /^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}$/,
              message: "Date must be in format DD.MM.YYYY HH:mm",
            },
          }}
        />

        <FormInput
          label="Deadline"
          name="deadline"
          type="text"
          placeholder="30.09.2025 12:00"
          register={register}
          errors={errors}
          rules={{
            required: "Deadline is required",
            pattern: {
              value: /^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}$/,
              message: "Date must be in format DD.MM.YYYY HH:mm",
            },
          }}
        />

        <FormInput
          label="Minutes to Complete"
          name="minutesToComplete"
          type="number"
          placeholder="30"
          register={register}
          errors={errors}
          rules={{
            required: "Minutes to complete is required",
            min: { value: 1, message: "Must be at least 1 minute" },
            valueAsNumber: true,
          }}
        />

        <h3>Questions</h3>
        {fields.length === 0 && <p>No questions added yet.</p>}
        {fields.map((q, index) => (
          <QuestionBlock
            key={q.id}
            q={q}
            index={index}
            control={control}
            register={register}
            errors={errors}
            watch={watch}
            remove={remove}
            setValue={setValue}
          />
        ))}

        <br />
        <button type="submit">Create Test</button>
      </form>
    </>
  );
};

export default CreateTestForm;
