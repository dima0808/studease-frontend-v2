import { useSelector } from 'react-redux';

import DisplayMultipleChoice from '@/components/DisplayQuestions/DisplayMultipleChoice';
import DisplaySingleChoice from '@/components/DisplayQuestions/DisplaySingleChoice';
import DisplayEssay from '@/components/DisplayQuestions/DisplayEssay';
import DisplayMatchPairs from '@/components/DisplayQuestions/DisplayMatchPairs';
import { normalizeTestSession } from '@/utils/normalizeTestSession';

const TestFinished = () => {
  const { testSession } = useSelector((state) => state.testSession);

  const normalized = normalizeTestSession(testSession);

  if (!testSession) return <h2>Loading...</h2>;

  return (
    <div className="test-finished">
      <div className="test-finished__header">
        <h1 className="test-finished__title">Test Finished</h1>
      </div>

      <div className="test-finished__student-info">
        <div className="test-finished__info-item">
          <span className="label">Student:</span>
          <span>{testSession.studentName}</span>
        </div>

        <div className="test-finished__info-item">
          <span className="label">Group:</span>
          <span>{testSession.studentGroup}</span>
        </div>

        <div className="test-finished__info-item">
          <span className="label">Started:</span>
          <span>{testSession.startedAt}</span>
        </div>

        <div className="test-finished__info-item">
          <span className="label">Finished:</span>
          <span>{testSession.finishedAt}</span>
        </div>

        <div className="test-finished__info-item">
          <span className="label">Mark:</span>
          <span>{testSession.mark ?? '—'}</span>
        </div>
      </div>

      <div className="test-finished__questions">
        <div className="test-finished__questions">
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
      </div>
    </div>
  );
};

export default TestFinished;
