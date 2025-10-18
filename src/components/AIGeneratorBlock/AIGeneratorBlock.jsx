import './AIGeneratorBlock.scss';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/FormInput';
import React from 'react';
import { useActions } from '@/hooks/useActions';

const AIGeneratorBlock = (props) => {
  const { setShowAIGenerationBlock, addQuestion } = props;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      theme: '',
      questionType: 'single_choice',
      points: 1,
      questionsCount: 1,
    },
  });

  const { generateQuestionsByAI } = useActions();

  const onSubmit = (data) => {
    (async () => {
      try {
        const { questions } = await generateQuestionsByAI(data).unwrap();
        questions.forEach((question) => addQuestion(question));
        setShowAIGenerationBlock(false);
      } catch (error) {
        console.error('Error generating questions:', error);
      }
    })();
    console.log(data);
  };

  return (
    <>
      <h3>AI Question Generator</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: 800, margin: '0 auto' }}
      >
        <FormInput
          label="Theme"
          name="theme"
          type="text"
          placeholder="E.g., Mathematics, History, Science"
          register={register}
          errors={errors}
          rules={{
            required: 'Theme is required',
            minLength: { value: 3, message: 'Must be at least 3 characters' },
            maxLength: {
              value: 100,
              message: 'Must be at most 100 characters',
            },
          }}
        />

        <div>
          <label>Type</label>
          <select
            {...register('questionType', {
              required: 'Question type is required',
            })}
          >
            <option value="single_choice">Single Choice</option>
            <option value="multiple_choices">Multiple Choices</option>
            <option value="essay">Essay</option>
            <option value="matching">Matching</option>
          </select>
        </div>

        <FormInput
          label="Points"
          name="points"
          type="number"
          placeholder="Points for the question"
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
          name="questionsCount"
          type="number"
          placeholder="Number of questions to generate"
          register={register}
          errors={errors}
          rules={{
            required: 'Questions count is required',
            min: { value: 1, message: 'Must be at least 1 question' },
            max: {
              value: 20,
              message: 'Cannot generate more than 20 questions at once',
            },
            valueAsNumber: true,
          }}
        />

        <button type="submit">Generate Questions</button>
        <button onClick={setShowAIGenerationBlock} type="button">
          Close
        </button>
      </form>
    </>
  );
};

export default AIGeneratorBlock;
