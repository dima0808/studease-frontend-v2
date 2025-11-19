import './CreatePage.scss';
import SidebarCreate from '@/layout/SidebarCreate';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useActions } from '@/hooks/useActions';
import { useFieldArray, useForm } from 'react-hook-form';
import FormInput from '@/components/FormInput';
import QuestionBlock from '@/components/QuestionBlock';
import CollectionBlock from '@/components/CollectionBlock';
import AIGeneratorBlock from '@/components/AIGeneratorBlock';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { ROUTES } from '@/constants/routes';
import NotificationErrorMessage from '@/components/NotificationErrorMessage';

const defaultQuestion = {
  id: Date.now(),
  content: '',
  points: 1,
  type: 'single_choice',
  answers: [],
};

const defaultCollection = {
  id: Date.now(),
  collectionName: '',
  points: 1,
  questionsCount: 1,
};

const defaultValues = {
  name: '',
  openDate: '',
  deadline: '',
  minutesToComplete: '',
  questions: [],
  samples: [],
};

const CreatePage = () => {
  const [params] = useSearchParams();
  const [collections, setCollections] = useState([]);
  const cloneId = params.get('cloneId');
  const {
    getFullTestById,
    getAllCollections,
    createTest,
    getFullCollectionById,
    createCollection,
  } = useActions();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [showAIGenerationBlock, setShowAIGenerationBlock] = useState(false);
  const { pathname } = useLocation();
  const isTest = pathname === `/${ROUTES.CREATE_TEST}`;

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

  const {
    fields: collectionFields,
    append: addCollection,
    remove: delCollection,
  } = useFieldArray({
    control,
    name: 'samples',
  });

  useEffect(() => {
    if (!cloneId) return;

    const fetchData = async () => {
      try {
        let data;

        if (isTest) {
          data = await getFullTestById(cloneId).unwrap();
        } else {
          data = await getFullCollectionById(cloneId).unwrap();
        }

        const filteredData = Object.keys(defaultValues).reduce((acc, key) => {
          if (data[key] !== undefined) acc[key] = data[key];
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
        console.error('Failed to fetch test/collection:', err);
      }
    };

    fetchData();
  }, [cloneId, isTest, getFullTestById, getFullCollectionById, reset]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllCollections().unwrap();
        setCollections(data);
      } catch (err) {
        console.error('Failed to fetch collections:', err);
      }
    })();
  }, [getAllCollections, isTest, setCollections]);

  const onSubmit = async (data) => {
    try {
      if (isTest) {
        await createTest(data).unwrap();
        navigate(`/${ROUTES.TESTS}`);
      } else {
        await createCollection(data).unwrap();
        navigate(`/${ROUTES.COLLECTIONS}`);
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <div className="create-layout">
      <SidebarCreate
        isTest={isTest}
        addQuestion={() => append({ ...defaultQuestion, id: Date.now() })}
        addCollection={() =>
          addCollection({ ...defaultCollection, id: Date.now() })
        }
        showAIGenerationBlock={() =>
          setShowAIGenerationBlock(!showAIGenerationBlock)
        }
      />
      <div className="create-layout__container">
        <form className="test-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="test-form__grid">
            {isTest ? (
              <>
                <FormInput
                  label="Test Name"
                  name="name"
                  type="text"
                  placeholder="Java Basics Test 9"
                  register={register}
                  errors={errors}
                  rules={{ required: 'Name is required' }}
                />

                <FormInput
                  label="Open Date: 20.09.2025 12:00"
                  name="openDate"
                  type="text"
                  placeholder="20.09.2025 12:00"
                  register={register}
                  errors={errors}
                  rules={{
                    required: 'Open date is required',
                    pattern: {
                      value: /^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}$/,
                      message: 'Date must be in format DD.MM.YYYY HH:mm',
                    },
                  }}
                />

                <FormInput
                  label="Deadline: 30.09.2025 12:00"
                  name="deadline"
                  type="text"
                  placeholder="30.09.2025 12:00"
                  register={register}
                  errors={errors}
                  rules={{
                    required: 'Deadline is required',
                    pattern: {
                      value: /^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}$/,
                      message: 'Date must be in format DD.MM.YYYY HH:mm',
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
                    required: 'Minutes to complete is required',
                    min: { value: 1, message: 'Must be at least 1 minute' },
                    valueAsNumber: true,
                  }}
                />
              </>
            ) : (
              <FormInput
                label="Collection Name"
                name="name"
                type="text"
                placeholder="Enter collection name"
                register={register}
                errors={errors}
                rules={{ required: 'Name is required' }}
              />
            )}
          </div>

          <h3 className="test-form__title">Questions</h3>
          {fields.length === 0 && (
            <p className="test-form__empty">No questions added yet.</p>
          )}

          <AnimatePresence>
            {fields.map((q, index) => (
              <Motion.div
                key={q.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <QuestionBlock
                  q={q}
                  index={index}
                  control={control}
                  register={register}
                  errors={errors}
                  watch={watch}
                  remove={remove}
                  setValue={setValue}
                />
              </Motion.div>
            ))}
          </AnimatePresence>

          {collectionFields.length > 0 && (
            <h3 className="test-form__title">Collections</h3>
          )}

          <AnimatePresence>
            {collectionFields.map((c, index) => (
              <Motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <CollectionBlock
                  c={c}
                  index={index}
                  collections={collections}
                  register={register}
                  errors={errors}
                  delCollection={delCollection}
                />
              </Motion.div>
            ))}
          </AnimatePresence>

          <button className="test-form__submit" type="submit">
            {isTest ? 'Create Test' : 'Create Collection'}
          </button>
        </form>
      </div>
      {showAIGenerationBlock && (
        <AIGeneratorBlock
          isOpen={showAIGenerationBlock}
          addQuestion={append}
          setShowAIGenerationBlock={() =>
            setShowAIGenerationBlock(!showAIGenerationBlock)
          }
        />
      )}
      {errorMessage && (
        <NotificationErrorMessage
          message={errorMessage}
          onClose={() => setErrorMessage('')}
          duration={3000}
        />
      )}
    </div>
  );
};

export default CreatePage;
