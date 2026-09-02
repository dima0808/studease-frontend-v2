import './CreatePage.scss';
import SidebarCreate from '@/layout/SidebarCreate';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useActions } from '@/hooks/useActions';
import { useTranslation } from 'react-i18next';
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
  maximumScore: '',
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
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState('');
  const [showAIGenerationBlock, setShowAIGenerationBlock] = useState(false);
  const location = useLocation();
  const { pathname } = location;
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
    const importedData = location.state?.importData;
    const importedKind = location.state?.importKind;

    if (!importedData) return;

    const expectedKind = isTest ? 'test' : 'collection';

    if (importedKind !== expectedKind) {
      setErrorMessage(t(`create.importWrongKind_${expectedKind}`));
      navigate(pathname, { replace: true, state: null });
      return;
    }

    reset({
      ...defaultValues,
      ...importedData,
    });
    navigate(pathname, { replace: true, state: null });
  }, [isTest, location.state, navigate, pathname, reset, t]);

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
          name: (filteredData.name || '') + t('create.copySuffix'),
        };

        reset(newData);
      } catch (err) {
        console.error('Failed to fetch test/collection:', err);
      }
    };

    fetchData();
  }, [cloneId, isTest, getFullTestById, getFullCollectionById, reset, t]);

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
                  label={t('create.fields.testName')}
                  name="name"
                  type="text"
                  register={register}
                  errors={errors}
                  rules={{ required: t('create.errors.nameRequired') }}
                />

                <FormInput
                  label={t('create.fields.openDate')}
                  name="openDate"
                  type="text"
                  register={register}
                  errors={errors}
                  rules={{
                    required: t('create.errors.openDateRequired'),
                    pattern: {
                      value: /^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}$/,
                      message: t('create.errors.dateFormat'),
                    },
                  }}
                />

                <FormInput
                  label={t('create.fields.deadline')}
                  name="deadline"
                  type="text"
                  register={register}
                  errors={errors}
                  rules={{
                    required: t('create.errors.deadlineRequired'),
                    pattern: {
                      value: /^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}$/,
                      message: t('create.errors.dateFormat'),
                    },
                  }}
                />

                <FormInput
                  label={t('create.fields.minutesToComplete')}
                  name="minutesToComplete"
                  type="number"
                  register={register}
                  errors={errors}
                  rules={{
                    required: t('create.errors.minutesRequired'),
                    min: { value: 1, message: t('create.errors.minMinutes') },
                    valueAsNumber: true,
                  }}
                />

                <FormInput
                  label={t('create.fields.maximumScore')}
                  name="maximumScore"
                  type="number"
                  register={register}
                  errors={errors}
                  rules={{
                    valueAsNumber: true,
                  }}
                />
              </>
            ) : (
              <FormInput
                label={t('create.fields.collectionName')}
                name="name"
                type="text"
                register={register}
                errors={errors}
                rules={{ required: t('create.errors.nameRequired') }}
              />
            )}
          </div>

          <h3 className="test-form__title">{t('create.questionsTitle')}</h3>
          {fields.length === 0 && (
            <p className="test-form__empty">{t('create.questionsEmpty')}</p>
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
            <h3 className="test-form__title">
              {t('create.collectionsTitle')}
            </h3>
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
            {isTest ? t('create.submitTest') : t('create.submitCollection')}
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
