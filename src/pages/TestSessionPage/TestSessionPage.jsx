import './TestSessionPage.scss';
import { useSelector } from 'react-redux';
import TestIntro from '@/pages/TestSessionPage/components/TestIntro';
import TestUserForm from '@/pages/TestSessionPage/components/TestUserForm';
import TestQuestions from '@/pages/TestSessionPage/components/TestQuestions';
import TestSessionLayout from '@/layout/TestSessionLayout';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useActions } from '@/hooks/useActions';
import Loading from '@/components/Loading';
import { AnimatePresence } from 'framer-motion';

const TestSessionPage = () => {
  const { step, isLoading, error, testInfo } = useSelector(
    (state) => state.testSession,
  );
  const { testId } = useParams();
  const { getTestSessionById } = useActions();

  useEffect(() => {
    getTestSessionById(testId);
  }, [getTestSessionById, testId]);

  return (
    <TestSessionLayout>
      {isLoading && <Loading text="test" />}
      {error && <p className="error">{error}</p>}
      {!isLoading && !error && (
        <AnimatePresence mode="wait">
          {step === 1 && <TestIntro {...testInfo} key="intro" />}
          {step === 2 && <TestUserForm {...testInfo} key="form" />}
          {step === 3 && <TestQuestions key="questions" />}
        </AnimatePresence>
      )}
    </TestSessionLayout>
  );
};

export default TestSessionPage;
