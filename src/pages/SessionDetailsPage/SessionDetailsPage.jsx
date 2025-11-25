import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useActions } from '@/hooks/useActions';
import Loading from '@/components/Loading';
import InfoLayout from '@/layout/InfoLayout';
import { fadeUp } from '@/constants/motionVariants';
import Button from '@/components/Button';
import { FaArrowLeft } from 'react-icons/fa';
import { motion as Motion } from 'framer-motion';
import './SessionDetailsPage.scss';
import ErrorTest from '@/components/ErrorTest';
import image from '@/assets/icons/error.svg';
import { normalizeTestSession } from '@/utils/normalizeTestSession';
import DisplayMultipleChoice from '@/components/DisplayQuestions/DisplayMultipleChoice';
import DisplaySingleChoice from '@/components/DisplayQuestions/DisplaySingleChoice';
import DisplayEssay from '@/components/DisplayQuestions/DisplayEssay';
import DisplayMatchPairs from '@/components/DisplayQuestions/DisplayMatchPairs';
import { ROUTES } from "@/constants/routes";

const SessionDetailsPage = () => {
  const { testId } = useParams();
  const [searchParams] = useSearchParams();
  const studentName = searchParams.get('studentName');
  const studentGroup = searchParams.get('studentGroup');
  const navigate = useNavigate();
  const { getFinishedSessionsByTestId } = useActions();
  const [sessionDetails, setSessionDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = `Answers - ${studentName || ''}`;
  }, [studentName])

  useEffect(() => {
    if (!testId || !studentName || !studentGroup) {
      navigate('/tests');
      return;
    }
    (async () => {
      try {
        setLoading(true);
        const details = await getFinishedSessionsByTestId({
          testId,
          studentName,
          studentGroup,
        }).unwrap();
        setSessionDetails(details);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    })();
  }, [
    testId,
    studentName,
    studentGroup,
    navigate,
    getFinishedSessionsByTestId,
  ]);

  if (loading)
    return (
      <div className="info-layout-page">
        <Loading
          className="info-layout-page__loading"
          text="session details..."
        />
      </div>
    );

  if (error)
    return (
      <ErrorTest
        className="session-details-page__error"
        message={
          error || 'Something went wrong while fetching session details.'
        }
        buttonText="Go back"
        image={image}
        showErrorText={false}
        onReload={() => navigate(-1)}
      />
    );

  if (!sessionDetails)
    return (
      <InfoLayout>
        <h2>No session details found.</h2>
      </InfoLayout>
    );

  const normalized = normalizeTestSession(sessionDetails.sessions[0]);

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
            onClick={() => navigate(`/${ROUTES.TESTS}/${testId}`)}
          />
          <h1 className="info-layout-page__title">
            Answers by {studentName} ({studentGroup})
          </h1>
        </div>
      </Motion.div>
      <Motion.div
        variants={fadeUp}
        custom={0.4}
        className="info-layout-page__questions"
      >
        <div>
          {normalized.map((q, index) => (
            <div key={q.id} className="test-finished__question-block">
              <p className="test-finished__q-index">Question {index + 1}</p>

              {q.type === 'multiple_choices' && (
                <DisplayMultipleChoice question={q} />
              )}

              {q.type === 'single_choice' && (
                <DisplaySingleChoice question={q} />
              )}

              {q.type === 'essay' && <DisplayEssay question={q} />}

              {q.type === 'matching' && <DisplayMatchPairs question={q} />}
            </div>
          ))}
        </div>
      </Motion.div>
    </InfoLayout>
  );
};

export default SessionDetailsPage;
