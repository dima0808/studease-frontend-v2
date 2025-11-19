import './AIGeneratorBlock.scss';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/FormInput';
import React, { useState } from 'react';
import { useActions } from '@/hooks/useActions';

const AIGeneratorBlock = ({
  setShowAIGenerationBlock,
  addQuestion,
  isOpen,
}) => {
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
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const { questions } = await generateQuestionsByAI(data).unwrap();
      questions.forEach((q) => addQuestion(q));

      setShowAIGenerationBlock(false);
    } catch (error) {
      console.error('Error generating questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Motion.div
            className="ai-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isLoading && setShowAIGenerationBlock(false)}
          />

          <Motion.div
            className="ai-modal"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.2 }}
          >
            <div className="ai-modal__header">
              <h3>AI Question Generator</h3>
              <button
                type="button"
                className="ai-modal__close"
                disabled={isLoading}
                onClick={() => setShowAIGenerationBlock(false)}
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="ai-modal__form">
              <FormInput
                label="Theme"
                name="theme"
                type="text"
                placeholder="E.g., Mathematics, History, Science"
                register={register}
                errors={errors}
                rules={{
                  required: 'Theme is required',
                  minLength: {
                    value: 3,
                    message: 'Must be at least 3 characters',
                  },
                  maxLength: {
                    value: 100,
                    message: 'Must be at most 100 characters',
                  },
                }}
              />

              <div className="form-select">
                <label>Type</label>
                <select
                  {...register('questionType', {
                    required: 'Question type is required',
                  })}
                  disabled={isLoading}
                >
                  <option value="single_choice">Single Choice</option>
                  <option value="multiple_choices">Multiple Choices</option>
                  <option value="essay">Essay</option>
                  <option value="matching">Matching</option>
                </select>
                {errors.questionType && (
                  <p className="error-msg">{errors.questionType.message}</p>
                )}
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
                  max: { value: 20, message: 'Max 20 questions per request' },
                  valueAsNumber: true,
                }}
              />

              <button
                type="submit"
                className="btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="spin" size={18} />
                ) : (
                  'Generate Questions'
                )}
              </button>
            </form>
          </Motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AIGeneratorBlock;
