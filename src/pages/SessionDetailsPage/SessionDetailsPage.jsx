import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useActions } from '@/hooks/useActions';
import Loading from '@/components/Loading';
import InfoLayout from '@/layout/InfoLayout';
import { fadeUp } from '@/constants/motionVariants';
import Button from '@/components/Button';
import { FaArrowLeft } from 'react-icons/fa';
import { motion as Motion } from 'framer-motion';

const SessionDetailsPage = () => {
  const { testId } = useParams();
  const [searchParams] = useSearchParams();
  const credentials = searchParams.get('credentials');

  const navigate = useNavigate();
  const { getSessionDetailsByIdByCredentials } = useActions();
  const [sessionDetails, setSessionDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(loading);

  useEffect(() => {
    if (!testId || !credentials) {
      navigate('/tests');
      return;
    }
    try {
      (async () => {
        setLoading(true);
        const details = await getSessionDetailsByIdByCredentials({
          testId,
          credentials,
        }).unwrap();
        setSessionDetails(details);
        console.log(details);
        setLoading(false);
      })();
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Failed to load session details');
    }
  }, [testId, credentials, navigate, getSessionDetailsByIdByCredentials]);

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
      <InfoLayout>
        <h2 className="error-text">{error}</h2>
      </InfoLayout>
    );

  if (!sessionDetails)
    return (
      <InfoLayout>
        <h2>No session details found.</h2>
      </InfoLayout>
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
          <h1 className="info-layout-page__title">
            {credentials.replace(':', ' ')}
          </h1>
        </div>
      </Motion.div>
    </InfoLayout>
  );
};

export default SessionDetailsPage;
