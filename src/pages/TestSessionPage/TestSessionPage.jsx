import './TestSessionPage.scss';
import { useSelector } from 'react-redux';
import TestIntro from '@/pages/TestSessionPage/components/TestIntro';
import TestUserForm from '@/pages/TestSessionPage/components/TestUserForm';
import TestQuestions from '@/pages/TestSessionPage/components/TestQuestions';
import TestSessionLayout from '@/layout/TestSessionLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useActions } from '@/hooks/useActions';
import Loading from '@/components/Loading';
import { AnimatePresence } from 'framer-motion';
import TestFinished from '@/pages/TestSessionPage/components/TestFinished.jsx';
import ErrorTest from '@/components/ErrorTest';
import image from '@/assets/icons/error.svg';
import { ROUTES } from '@/constants/routes';

const TestSessionPage = () => {
  const { step, isLoading, error, testInfo, credentials } = useSelector(
    (state) => state.testSession,
  );
  const { testId } = useParams();
  const { getTestSessionById, getCurrentQuestion } = useActions();
  const navigate = useNavigate();

  useEffect(() => {
    getTestSessionById(testId);
    if (credentials.studentGroup !== '' && credentials.studentName !== '') {
      getCurrentQuestion({ testId, credentials });
    }
  }, []);

  return (
    <TestSessionLayout>
      {isLoading && <Loading text="test" />}
      {error && (
        <ErrorTest
          onReload={() => {
            navigate(ROUTES.DEFAULT);
          }}
          message="Sorry, we couldn't find your test. Please check the link or try again later."
          image={image}
          buttonText="Go to Home"
        />
      )}
      {!isLoading && !error && (
        <AnimatePresence mode="wait">
          {step === 1 && <TestIntro {...testInfo} key="intro" />}
          {step === 2 && <TestUserForm {...testInfo} key="form" />}
          {step === 3 && <TestQuestions key="questions" />}
          {step === 4 && <TestFinished key="finished" />}
        </AnimatePresence>
      )}
    </TestSessionLayout>
  );
};

export default TestSessionPage;
