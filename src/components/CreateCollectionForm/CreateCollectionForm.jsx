import './CreateCollectionForm.scss';
import SidebarCreation from '@/components/SidebarCreation';
import { useSearchParams } from 'react-router-dom';
import { useActions } from '@/hooks/useActions';
import { useFieldArray, useForm } from 'react-hook-form';
import FormInput from '@/components/FormInput';
import React, { useEffect, useState } from 'react';
import QuestionBlock from '@/components/QuestionBlock';
import AIGeneratorBlock from '@/components/AIGeneratorBlock';

const defaultQuestion = {
  id: Date.now(),
  content: '',
  points: 1,
  type: 'single_choice',
  answers: [],
};

const defaultValues = {
  name: '',
  questions: [],
};

const CreateCollectionForm = () => {
  const [params] = useSearchParams();
  const cloneId = params.get('cloneId');
  const { getFullCollectionById, createCollection } = useActions();

  const [showAIGenerationBlock, setShowAIGenerationBlock] = useState(false);

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
    name: 'questions',
  });

  useEffect(() => {
    if (cloneId) {
      (async () => {
        try {
          const data = await getFullCollectionById(cloneId).unwrap();

          const filteredData = Object.keys(defaultValues).reduce((acc, key) => {
            if (data[key] !== undefined) {
              acc[key] = data[key];
            }
            return acc;
          }, {});

          if (Array.isArray(filteredData.questions)) {
            filteredData.questions = filteredData.questions.map((q) => {
              if (q.type === 'matching' && Array.isArray(q.answers)) {
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
            name: (filteredData.name || '') + ' (Copy)',
          };

          reset(newData);
        } catch (err) {
          console.error('Failed to fetch test:', err);
        }
      })();
    }
  }, [cloneId, getFullCollectionById, reset]);

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    createCollection(data);
    // reset()
  };

  return (
    <>
      <SidebarCreation
        addQuestion={() => append({ ...defaultQuestion, id: Date.now() })}
        showAIGenerationBlock={() =>
          setShowAIGenerationBlock(!showAIGenerationBlock)
        }
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: 800, margin: '0 auto' }}
      >
        <FormInput
          label="Collection Name"
          name="name"
          type="text"
          placeholder="Enter collection name"
          register={register}
          errors={errors}
          rules={{ required: 'Name is required' }}
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
      {showAIGenerationBlock && (
        <AIGeneratorBlock
          addQuestion={append}
          setShowAIGenerationBlock={() =>
            setShowAIGenerationBlock(!showAIGenerationBlock)
          }
        />
      )}
    </>
  );
};

export default CreateCollectionForm;
