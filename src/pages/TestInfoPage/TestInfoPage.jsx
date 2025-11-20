import { useNavigate, useParams } from 'react-router-dom';
import {
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiList,
  FiUsers,
  FiAward,
  FiUser,
  FiChevronUp,
  FiChevronDown,
  FiInfo,
} from 'react-icons/fi';

import { Eye } from 'lucide-react';
import { FaArrowLeft } from 'react-icons/fa';
import { motion as Motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useActions } from '@/hooks/useActions';
import { ROUTES_NAV } from '@/constants/routes';
import { FRONTEND_PORT, HTTP_PROTOCOL, IP } from '@/constants/config';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import { fadeUp } from '@/constants/motionVariants';
import DisplaySingleChoice from '@/components/DisplayQuestions/DisplaySingleChoice';
import DisplayMultipleChoice from '@/components/DisplayQuestions/DisplayMultipleChoice';
import DisplayEssay from '@/components/DisplayQuestions/DisplayEssay';
import DisplayMatchPairs from '@/components/DisplayQuestions/DisplayMatchPairs';
import InfoLayout from '@/layout/InfoLayout';

const TestInfoPage = () => {
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [copied, setCopied] = useState(false);
  const { getFullTestById, getFinishedSessionsByTestId } = useActions();
  const navigate = useNavigate();

  useEffect(() => {
    if (testId) {
      (async () => {
        try {
          const testData = await getFullTestById(testId).unwrap();
          const finishedSessions =
            await getFinishedSessionsByTestId(testId).unwrap();

          const detailedTestData = {
            ...testData,
            sessions: finishedSessions.sessions || [],
          };
          setTest(detailedTestData);
        } catch (error) {
          console.error('Error fetching test data:', error);
          navigate(ROUTES_NAV.TESTS.href);
        }
      })();
    }
  }, [testId, getFullTestById, navigate, getFinishedSessionsByTestId]);

  const testLink = `${HTTP_PROTOCOL}://${IP}${FRONTEND_PORT}/${testId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(testLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const [searchQuery, setSearchQuery] = useState('');

  const filteredSessions = (test?.sessions || []).filter((session) =>
    session.studentName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortedSessions = [...filteredSessions].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const SortIcon = ({ field }) => {
    if (sortField !== field)
      return <FiChevronUp className="sort-icon disabled" />;
    return sortOrder === 'asc' ? (
      <FiChevronUp className="sort-icon" />
    ) : (
      <FiChevronDown className="sort-icon" />
    );
  };

  if (!test)
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
          <h1 className="info-layout-page__title">{test.name}</h1>
        </div>

        <Button
          className="info-layout-page__copy-link-button"
          text={copied ? 'Copied!' : 'Copy Test Link'}
          onClick={handleCopyLink}
          iconName="LinkIcon"
        />
      </Motion.div>

      <Motion.div
        className="info-layout-page__details"
        variants={fadeUp}
        custom={0.2}
      >
        <h2 className="info-layout-page__sessions-title">Test Details</h2>
        <p className="info-layout-page__details-item">
          <FiCalendar className="info-layout-page__icon" /> Open date:{' '}
          {test.openDate}
        </p>
        <p className="info-layout-page__details-item">
          <FiCalendar className="info-layout-page__icon" /> Deadline:{' '}
          {test.deadline}
        </p>
        <p className="info-layout-page__details-item">
          <FiClock className="info-layout-page__icon" /> Minutes to complete:{' '}
          {test.minutesToComplete}
        </p>
        <p className="info-layout-page__details-item">
          <FiAward className="info-layout-page__icon" /> Max score:{' '}
          {test.maxScore}
        </p>
        <p className="info-layout-page__details-item">
          <FiList className="info-layout-page__icon" /> Questions count:{' '}
          {test.questionsCount}
        </p>
        <p className="info-layout-page__details-item">
          <FiUsers className="info-layout-page__icon" /> Started sessions:{' '}
          {test.startedSessions}
        </p>
        <p className="info-layout-page__details-item">
          <FiCheckCircle className="info-layout-page__icon" /> Finished
          sessions: {test.finishedSessions}
        </p>
      </Motion.div>

      <Motion.div
        className="info-layout-page__sessions"
        variants={fadeUp}
        custom={0.3}
      >
        <div className="info-layout-page__section-header">
          <h2 className="info-layout-page__sessions-title">
            Finished Sessions
          </h2>
          <input
            type="text"
            placeholder="Search by student name..."
            className="info-layout-page__search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {test.sessions && test.sessions.length > 0 ? (
          <Motion.div
            className="info-layout-page__list"
            initial="hidden"
            animate="visible"
          >
            <div className="info-layout-page__list-header">
              <div
                onClick={() => handleSort('studentGroup')}
                className="info-layout-page__list-header-item"
              >
                <FiUsers /> Group <SortIcon field="studentGroup" />
              </div>
              <div
                onClick={() => handleSort('studentName')}
                className="info-layout-page__list-header-item"
              >
                <FiUser /> Name <SortIcon field="studentName" />
              </div>
              <div
                onClick={() => handleSort('startedAt')}
                className="info-layout-page__list-header-item"
              >
                <FiClock /> Started <SortIcon field="startedAt" />
              </div>
              <div
                onClick={() => handleSort('finishedAt')}
                className="info-layout-page__list-header-item"
              >
                <FiCalendar /> Finished <SortIcon field="finishedAt" />
              </div>
              <div
                onClick={() => handleSort('mark')}
                className="info-layout-page__list-header-item"
              >
                <FiAward /> Score <SortIcon field="mark" />
              </div>
              <div className="info-layout-page__list-header-item">
                <FiInfo /> Details
              </div>
            </div>

            <Motion.div
              className="info-layout-page__list-body"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.05 },
                },
              }}
            >
              {sortedSessions.map((session) => (
                <Motion.div
                  key={session.sessionId}
                  className="info-layout-page__list-row"
                  variants={fadeUp}
                >
                  <div className="info-layout-page__list-cell">
                    {session.studentGroup}
                  </div>
                  <div className="info-layout-page__list-cell">
                    {session.studentName}
                  </div>
                  <div className="info-layout-page__list-cell">
                    {session.startedAt}
                  </div>
                  <div className="info-layout-page__list-cell">
                    {session.finishedAt}
                  </div>
                  <div className="info-layout-page__list-cell">
                    {session.mark}
                  </div>
                  <div
                    className="info-layout-page__list-cell info-layout-page__list-cell--icon"
                    onClick={() =>
                      navigate(
                        `/session-details/${testId}?credentials=${session.studentGroup}:${session.studentName}`,
                      )
                    }
                    style={{ cursor: 'pointer' }}
                  >
                    <Eye size={20} />
                  </div>
                </Motion.div>
              ))}
            </Motion.div>
          </Motion.div>
        ) : (
          <p className="info-layout-page__no-sessions">
            No finished sessions available.
          </p>
        )}
      </Motion.div>

      <Motion.div
        className="info-layout-page__questions"
        variants={fadeUp}
        custom={0.4}
      >
        <div className="info-layout-page__section-header">
          <h2 className="info-layout-page__sessions-title">Test Questions</h2>
        </div>

        {test.questions && test.questions.length > 0 ? (
          <Motion.div
            className="info-layout-page__list-body"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05 } },
            }}
          >
            {test.questions.map((question) => {
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

export default TestInfoPage;
