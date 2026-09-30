import './TestSessionPage.scss';
import { useSelector } from 'react-redux';
import TestIntro from '@/pages/TestSessionPage/components/TestIntro';
import TestUserForm from '@/pages/TestSessionPage/components/TestUserForm';
import TestQuestions from '@/pages/TestSessionPage/components/TestQuestions';
import TestSessionLayout from '@/layout/TestSessionLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useActions } from '@/hooks/useActions';
import Loading from '@/components/Loading';
import { AnimatePresence } from 'framer-motion';
import TestFinished from '@/pages/TestSessionPage/components/TestFinished.jsx';
import ErrorTest from '@/components/ErrorTest';
import image from '@/assets/icons/error.svg';
import { ROUTES } from '@/constants/routes';
import { hasAttempt } from '@/utils/attemptToken';
import { STEP } from '@/store/testSession/testSession.slice';

const TestSessionPage = () => {
  const { step, isLoading, error, testInfo } = useSelector(
    (state) => state.testSession,
  );
  const { testId } = useParams();
  const { getTestSessionById, getCurrentQuestion } = useActions();
  const navigate = useNavigate();

  // An attempt token in `sessionStorage` means this tab was mid-attempt and the
  // student reloaded — resume rather than showing the intro.
  const [isResuming, setIsResuming] = useState(() => hasAttempt(testId));

  useEffect(() => {
    getTestSessionById(testId);

    if (!hasAttempt(testId)) {
      setIsResuming(false);
      return;
    }

    setIsResuming(true);
    getCurrentQuestion({ testId }).finally(() => setIsResuming(false));
  }, [testId, getTestSessionById, getCurrentQuestion]);

  return (
    <TestSessionLayout>
      {(isLoading || isResuming) && <Loading text="test" />}
      {error && (
        <ErrorTest
          onReload={() => {
            navigate(ROUTES.DEFAULT);
          }}
          message="Sorry, we couldn't find your test. Please check the link or try again later."
          image={image}
          buttonText="Go to home"
        />
      )}
      {!isLoading && !isResuming && !error && (
        <AnimatePresence mode="wait">
          {step === STEP.INTRO && <TestIntro {...testInfo} key="intro" />}
          {step === STEP.FORM && <TestUserForm {...testInfo} key="form" />}
          {step === STEP.QUESTIONS && <TestQuestions key="questions" />}
          {step === STEP.FINISHED && <TestFinished key="finished" />}
        </AnimatePresence>
      )}
    </TestSessionLayout>
  );
};

export default TestSessionPage;
