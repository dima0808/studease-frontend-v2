import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useActions } from "@/hooks/useActions";
import { ROUTES } from "@/constants/routes";

const defaultQuestion = {
  id: 1,
  content: "Що виведе System.out.println(2 + 2 * 2)?",
  points: 2,
  type: "single_choice",
  answers: [
    { id: 1, content: "8", isCorrect: false, leftOption: null, rightOption: null },
    { id: 2, content: "6", isCorrect: true, leftOption: null, rightOption: null },
  ],
};

const defaultValues = {
  name: "",
  openDate: "",
  deadline: "",
  minutesToComplete: "",
  questions: [defaultQuestion],
};

const CreateTestForm = () => {
  const [params] = useSearchParams()
  const cloneId = params.get("cloneId");
  const { getTestById, createTest } = useActions()
  const navigate = useNavigate()

  console.log('Cloning test with ID:', cloneId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      openDate: "",
      deadline: "",
      minutesToComplete: "",
      questions: [defaultQuestion],
    },
  });

  useEffect(() => {
    if (cloneId) {
      (async () => {
        try {
          const data = await getTestById(cloneId).unwrap();

          const filteredData = Object.keys(defaultValues).reduce((acc, key) => {
            if (data[key] !== undefined) {
              acc[key] = data[key];
            }
            return acc;
          }, {});

          reset({
            ...defaultValues,
            ...filteredData,
            name: (filteredData.name || "") + " (Copy)",
          });
        } catch (err) {
          console.error("Failed to fetch test:", err);
        }
      })();
    }
  }, [cloneId, getTestById, reset]);

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    createTest(data);
    reset();
    navigate(`/${ROUTES.TESTS}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400, margin: "0 auto" }}>
      <div>
        <label>Test Name</label>
        <input
          placeholder="Java Basics Test 9"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
      </div>

      <div>
        <label>Open Date</label>
        <input
          placeholder="20.09.2025 12:00"
          {...register("openDate", {
            required: "Open date is required",
            pattern: {
              value: /^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}$/,
              message: "Date must be in format DD.MM.YYYY HH:mm",
            },
          })}
        />
        {errors.openDate && <p style={{ color: "red" }}>{errors.openDate.message}</p>}
      </div>

      <div>
        <label>Deadline</label>
        <input
          placeholder="30.09.2025 12:00"
          {...register("deadline", {
            required: "Deadline is required",
            pattern: {
              value: /^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}$/,
              message: "Date must be in format DD.MM.YYYY HH:mm",
            },
          })}
        />
        {errors.deadline && <p style={{ color: "red" }}>{errors.deadline.message}</p>}
      </div>

      <div>
        <label>Minutes to Complete</label>
        <input
          type="number"
          placeholder="30"
          {...register("minutesToComplete", {
            required: "Minutes to complete is required",
            min: { value: 1, message: "Must be at least 1 minute" },
          })}
        />
        {errors.minutesToComplete && <p style={{ color: "red" }}>{errors.minutesToComplete.message}</p>}
      </div>

      <button type="submit">Create Test</button>
    </form>
  );
};

export default CreateTestForm;
