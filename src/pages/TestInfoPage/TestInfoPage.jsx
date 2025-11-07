import './TestInfoPage.scss';
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
} from 'react-icons/fi';
import { FaArrowLeft } from 'react-icons/fa';
import { motion as Motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useActions } from '@/hooks/useActions';
import { ROUTES_NAV } from '@/constants/routes';
import { FRONTEND_PORT, HTTP_PROTOCOL, IP } from '@/constants/config';
import Button from '@/components/Button';
import Loading from '@/components/Loading';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

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
          console.log(detailedTestData);
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
      <div className="test-info-page">
        <Loading className="test-info-page__loading" text="test info..." />
      </div>
    );

  return (
    <Motion.div
      className="test-info-page"
      initial="hidden"
      animate="visible"
      variants={fadeUp}
    >
      {/* HEADER */}
      <Motion.div
        className="test-info-page__header"
        variants={fadeUp}
        custom={0.1}
      >
        <div className="test-info-page__title-container">
          <Button
            className="test-info-page__back"
            text={<FaArrowLeft size={21} />}
            onClick={() => navigate(-1)}
          />
          <h1 className="test-info-page__title">{test.name}</h1>
        </div>

        <Button
          className="test-info-page__copy-link-button"
          text={copied ? 'Copied!' : 'Copy Test Link'}
          onClick={handleCopyLink}
          iconName="LinkIcon"
        />
      </Motion.div>

      {/* DETAILS */}
      <Motion.div
        className="test-info-page__details"
        variants={fadeUp}
        custom={0.2}
      >
        <h2 className="test-info-page__sessions-title">Test Details</h2>
        <p className="test-info-page__details-item">
          <FiCalendar className="test-info-page__icon" /> Open date:{' '}
          {test.openDate}
        </p>
        <p className="test-info-page__details-item">
          <FiCalendar className="test-info-page__icon" /> Deadline:{' '}
          {test.deadline}
        </p>
        <p className="test-info-page__details-item">
          <FiClock className="test-info-page__icon" /> Minutes to complete:{' '}
          {test.minutesToComplete}
        </p>
        <p className="test-info-page__details-item">
          <FiAward className="test-info-page__icon" /> Max score:{' '}
          {test.maxScore}
        </p>
        <p className="test-info-page__details-item">
          <FiList className="test-info-page__icon" /> Questions count:{' '}
          {test.questionsCount}
        </p>
        <p className="test-info-page__details-item">
          <FiUsers className="test-info-page__icon" /> Started sessions:{' '}
          {test.startedSessions}
        </p>
        <p className="test-info-page__details-item">
          <FiCheckCircle className="test-info-page__icon" /> Finished sessions:{' '}
          {test.finishedSessions}
        </p>
      </Motion.div>

      {/* SESSIONS */}
      <Motion.div
        className="test-info-page__sessions"
        variants={fadeUp}
        custom={0.3}
      >
        <div className="test-info-page__section-header">
          <h2 className="test-info-page__sessions-title">Finished Sessions</h2>
          <input
            type="text"
            placeholder="Search by student name..."
            className="test-info-page__search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {test.sessions && test.sessions.length > 0 ? (
          <Motion.div
            className="test-info-page__list"
            initial="hidden"
            animate="visible"
          >
            <div className="test-info-page__list-header">
              <div
                onClick={() => handleSort('studentGroup')}
                className="test-info-page__list-header-item"
              >
                <FiUsers /> Group <SortIcon field="studentGroup" />
              </div>
              <div
                onClick={() => handleSort('studentName')}
                className="test-info-page__list-header-item"
              >
                <FiUser /> Name <SortIcon field="studentName" />
              </div>
              <div
                onClick={() => handleSort('startedAt')}
                className="test-info-page__list-header-item"
              >
                <FiClock /> Started <SortIcon field="startedAt" />
              </div>
              <div
                onClick={() => handleSort('finishedAt')}
                className="test-info-page__list-header-item"
              >
                <FiCalendar /> Finished <SortIcon field="finishedAt" />
              </div>
              <div
                onClick={() => handleSort('mark')}
                className="test-info-page__list-header-item"
              >
                <FiAward /> Score <SortIcon field="mark" />
              </div>
            </div>

            <Motion.div
              className="test-info-page__list-body"
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
                  className="test-info-page__list-row"
                  variants={fadeUp}
                >
                  <div className="test-info-page__list-cell">
                    {session.studentGroup}
                  </div>
                  <div className="test-info-page__list-cell">
                    {session.studentName}
                  </div>
                  <div className="test-info-page__list-cell">
                    {session.startedAt}
                  </div>
                  <div className="test-info-page__list-cell">
                    {session.finishedAt}
                  </div>
                  <div className="test-info-page__list-cell">
                    {session.mark}
                  </div>
                </Motion.div>
              ))}
            </Motion.div>
          </Motion.div>
        ) : (
          <p className="test-info-page__no-sessions">
            No finished sessions available.
          </p>
        )}
      </Motion.div>
    </Motion.div>
  );
};

export default TestInfoPage;
