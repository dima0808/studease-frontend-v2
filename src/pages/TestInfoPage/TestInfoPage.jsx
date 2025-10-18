import './TestInfoPage.scss';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '@/components/BackButton';
import { useEffect, useState } from 'react';
import { useActions } from '@/hooks/useActions';
import { ROUTES_NAV } from '@/constants/routes';
import { FRONTEND_PORT, HTTP_PROTOCOL, IP } from '@/constants/config';

const TestInfoPage = () => {
  const { testId } = useParams();
  const [test, setTest] = useState();
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
            ...finishedSessions,
          };
          setTest(testData);
          console.log('Detailed Test Data:', detailedTestData);
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
      console.error('Не вдалося скопіювати посилання:', err);
    }
  };

  return (
    <>
      <BackButton />
      <div
        className="test-info-page"
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <h1>Test Info Page</h1>
        <div
          style={{
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '8px',
            width: '80%',
            maxWidth: '600px',
            textAlign: 'left',
          }}
        >
          {test ? (
            <>
              <h2>{test.name}</h2>
              <p>
                <span>Open date: </span>
                {test.openDate}
              </p>
              <p>
                <span>Deadline: </span>
                {test.deadline}
              </p>
              <p>
                <span>Max score: </span>
                {test.maxScore}
              </p>
              <p>
                <span>Minutes to complete: </span>
                {test.minutesToComplete}
              </p>
              <p>
                <span>Questions count: </span>
                {test.questionsCount}
              </p>

              <div
                className="test-info__link-block"
                style={{
                  marginTop: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <label htmlFor="testLink">
                  <strong>Test Link:</strong>
                </label>
                <div className="test-info__link-row">
                  <input
                    id="testLink"
                    type="text"
                    value={testLink}
                    readOnly
                    className="test-info__link-input"
                  />
                  <button
                    onClick={handleCopyLink}
                    className={`test-info__copy-btn ${copied ? 'copied' : ''}`}
                  >
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p>Not found information</p>
          )}
        </div>
      </div>
    </>
  );
};

export default TestInfoPage;
