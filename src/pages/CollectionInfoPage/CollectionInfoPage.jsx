import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ROUTES_NAV } from '@/constants/routes';
import { useActions } from '@/hooks/useActions';
import { motion as Motion } from 'framer-motion';
import { fadeUp } from '@/constants/motionVariants';
import Button from '@/components/Button';
import { FaArrowLeft } from 'react-icons/fa';
import { FiList } from 'react-icons/fi';
import DisplaySingleChoice from '@/components/DisplayQuestions/DisplaySingleChoice';
import DisplayMultipleChoice from '@/components/DisplayQuestions/DisplayMultipleChoice';
import DisplayEssay from '@/components/DisplayQuestions/DisplayEssay';
import DisplayMatchPairs from '@/components/DisplayQuestions/DisplayMatchPairs';
import Loading from '@/components/Loading';
import InfoLayout from '@/layout/InfoLayout';

const CollectionInfoPage = () => {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);
  const navigate = useNavigate();
  const { getFullCollectionById } = useActions();

  useEffect(() => {
    if (collectionId) {
      (async () => {
        try {
          const collectionData =
            await getFullCollectionById(collectionId).unwrap();
          console.log(collectionData);
          setCollection(collectionData);
        } catch (error) {
          console.error('Error fetching test data:', error);
          navigate(ROUTES_NAV.TESTS.href);
        }
      })();
    }
  }, [collectionId, getFullCollectionById, navigate]);

  if (!collection)
    return (
      <div className="info-layout-page">
        <Loading className="info-layout-page__loading" text="test info..." />
      </div>
    );

  return (
    <InfoLayout>
      <Motion.div
        className="info-layout-page__header"
        variants={fadeUp}
        custom={0.1}
      >
        <div className="info-layout-page__title-container">
          <Button
            className="info-layout-page__back"
            text={<FaArrowLeft size={21} />}
            onClick={() => navigate(-1)}
          />
          <h1 className="info-layout-page__title">{collection.name}</h1>
        </div>
      </Motion.div>

      <Motion.div
        className="info-layout-page__details"
        variants={fadeUp}
        custom={0.2}
      >
        <h2 className="info-layout-page__sessions-title">Collection Details</h2>
        <p className="info-layout-page__details-item">
          <FiList className="info-layout-page__icon" /> Questions count:{' '}
          {collection.questionsCount}
        </p>
      </Motion.div>

      <Motion.div
        className="info-layout-page__questions"
        variants={fadeUp}
        custom={0.4}
      >
        <div className="info-layout-page__section-header">
          <h2 className="info-layout-page__sessions-title">
            Collection Questions
          </h2>
        </div>

        {collection.questions && collection.questions.length > 0 ? (
          <Motion.div
            className="info-layout-page__list-body"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05 } },
            }}
          >
            {collection.questions.map((question) => {
              switch (question.type) {
                case 'single_choice':
                  return (
                    <Motion.div key={question.id} variants={fadeUp}>
                      <DisplaySingleChoice question={question} />
                    </Motion.div>
                  );
                case 'multiple_choices':
                  return (
                    <Motion.div key={question.id} variants={fadeUp}>
                      <DisplayMultipleChoice question={question} />
                    </Motion.div>
                  );
                case 'essay':
                  return (
                    <Motion.div key={question.id} variants={fadeUp}>
                      <DisplayEssay question={question} />
                    </Motion.div>
                  );
                case 'matching':
                  return (
                    <Motion.div key={question.id} variants={fadeUp}>
                      <DisplayMatchPairs question={question} />
                    </Motion.div>
                  );
                default:
                  return null;
              }
            })}
          </Motion.div>
        ) : (
          <p className="info-layout-page__no-sessions">
            No questions available.
          </p>
        )}
      </Motion.div>
    </InfoLayout>
  );
};

export default CollectionInfoPage;
