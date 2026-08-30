import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import DisplayMultipleChoice from '@/components/DisplayQuestions/DisplayMultipleChoice';
import DisplaySingleChoice from '@/components/DisplayQuestions/DisplaySingleChoice';
import DisplayEssay from '@/components/DisplayQuestions/DisplayEssay';
import DisplayMatchPairs from '@/components/DisplayQuestions/DisplayMatchPairs';
import AttemptBar from '@/pages/TestSessionPage/components/AttemptBar';
import Button from '@/components/Button';
import KpiFootnote from '@/components/KpiFootnote';
import Loading from '@/components/Loading';
import { normalizeTestSession } from '@/utils/normalizeTestSession';
import { clearAttempt } from '@/utils/attemptToken';
import { formatShortDate, minutesBetween } from '@/utils/formatDate';
import { ROUTES } from '@/constants/routes';
import classNames from 'classnames';

// A choice question is right only when every option landed where it belongs.
const isFullyCorrect = (question) =>
  question.answers.length > 0 &&
  question.answers.every((a) => a.isCorrect === a.userSelected);

// Essays are marked by a person, so the client cannot say what they earned.
const isMachineMarked = (type) => type !== 'essay';

const TestFinished = () => {
  const { testSession, testInfo } = useSelector((state) => state.testSession);
  const { testId } = useParams();
  const navigate = useNavigate();
  const [showEveryAnswer, setShowEveryAnswer] = useState(false);

  // The attempt is over and its results are on screen — the token is spent.
  useEffect(() => {
    clearAttempt(testId);
  }, [testId]);

  if (!testSession) return <Loading text="your result" />;

  const normalized = normalizeTestSession(testSession);

  const maxScore =
    testInfo?.maxScore ??
    normalized.reduce((sum, question) => sum + (question.points ?? 0), 0);

  const marked = normalized.filter((q) => isMachineMarked(q.type));
  const correctCount = marked.filter(isFullyCorrect).length;
  const minutesTaken = minutesBetween(
    testSession.startedAt,
    testSession.finishedAt,
  );

  const duration =
    minutesTaken !== null && testInfo?.minutesToComplete
      ? `, in ${minutesTaken} of your ${testInfo.minutesToComplete} minutes`
      : minutesTaken !== null
        ? `, in ${minutesTaken} minutes`
        : '';

  return (
    <>
      <AttemptBar>
        {testSession.studentName && (
          <span className="attempt__student">
            {testSession.studentName}
            {testSession.studentGroup ? ` · ${testSession.studentGroup}` : ''}
          </span>
        )}
      </AttemptBar>

      <div className="test-finished">
        <p className="attempt__kicker">You&apos;re done — it&apos;s recorded</p>

        <div className="test-finished__score-row">
          <div>
            <p className="test-finished__score">
              {testSession.mark ?? '—'}
              <span>/{maxScore}</span>
            </p>
            <p className="test-finished__sentence">
              {correctCount} of {marked.length} right{duration}. Your score is
              with your instructor — nothing else is required of you.
            </p>
          </div>

          <div className="test-finished__facts">
            <p className="test-finished__fact-label">Started</p>
            <p className="test-finished__fact-value">
              {formatShortDate(testSession.startedAt)}
            </p>
            <p className="test-finished__fact-label">Finished</p>
            <p className="test-finished__fact-value">
              {formatShortDate(testSession.finishedAt)}
            </p>
          </div>
        </div>

        <hr className="test-finished__rule" />

        <div className="test-finished__breakdown-head">
          <p className="test-finished__breakdown-title">
            Where the points went
          </p>
          <button
            type="button"
            className="test-finished__toggle"
            onClick={() => setShowEveryAnswer((open) => !open)}
          >
            {showEveryAnswer ? 'Hide the answers' : 'See every answer'}
          </button>
        </div>

        <div className="test-finished__list">
          {normalized.map((question, index) => {
            const machineMarked = isMachineMarked(question.type);
            const correct = machineMarked && isFullyCorrect(question);
            const earned = machineMarked ? (correct ? question.points : 0) : '—';

            return (
              <div
                key={question.id}
                className={classNames('test-finished__row', {
                  'test-finished__row--lost': machineMarked && !correct,
                })}
              >
                <span className="test-finished__row-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="test-finished__row-text">
                  {question.content}
                </span>
                <span className="test-finished__row-points">
                  {earned}/{question.points}
                </span>
              </div>
            );
          })}
        </div>

        {showEveryAnswer && (
          <div className="test-finished__review">
            {normalized.map((q) => (
              <div key={q.id}>
                {q.type === 'multiple_choices' && (
                  <DisplayMultipleChoice question={q} showResults />
                )}
                {q.type === 'single_choice' && (
                  <DisplaySingleChoice question={q} showResults />
                )}
                {q.type === 'essay' && <DisplayEssay question={q} />}
                {q.type === 'matching' && <DisplayMatchPairs question={q} />}
              </div>
            ))}
          </div>
        )}

        <div className="test-finished__footer">
          <Button
            theme="primary"
            size="lg"
            text="Back to my tests"
            onClick={() => navigate(`/${ROUTES.TESTS}`)}
          />
          <button
            type="button"
            className="attempt-link attempt-link--quiet"
            onClick={() => window.print()}
          >
            Download receipt
          </button>
          <KpiFootnote className="test-finished__footnote" />
        </div>
      </div>
    </>
  );
};

export default TestFinished;
