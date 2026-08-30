import { useActions } from '@/hooks/useActions';
import Important from '@/components/Important';
import Button from '@/components/Button';
import AttemptBar from '@/pages/TestSessionPage/components/AttemptBar';
import { motion as Motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

const SPEC_LABELS = {
  minutesToComplete: 'Time you get',
  questionsCount: 'Questions',
  maxScore: 'Points on the table',
  deadline: 'Closes',
};

const TestIntro = (props) => {
  const { name, deadline, questionsCount, minutesToComplete, maxScore } = props;
  const { setStep } = useActions();

  const spec = [
    ['minutesToComplete', `${minutesToComplete} min`],
    ['questionsCount', questionsCount],
    ['maxScore', maxScore],
    ['deadline', deadline],
  ];

  return (
    <>
      <AttemptBar />
      <div className="attempt__body">
        <Motion.div
          className="test-intro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <p className="attempt__kicker">Not started yet</p>

          <h1 className="test-intro__title">{name}</h1>

          <div className="test-intro__spec attempt-spec">
            {spec.map(([key, value]) => (
              <div className="attempt-spec__row" key={key}>
                <span className="attempt-spec__label">{SPEC_LABELS[key]}</span>
                <span className="attempt-spec__value">{value}</span>
              </div>
            ))}
          </div>

          <p className="test-intro__text">
            You can answer in any order and come back to anything you skip.
            Everything saves on the server as you go, so a closed tab or a lost
            connection costs you nothing but the clock.
          </p>

          <Important
            className="test-intro__notice"
            text="This attempt is monitored — tab switches are logged. The clock does not pause."
          />

          <div className="test-intro__actions">
            <Button
              theme="primary"
              size="xl"
              icon={ArrowRight}
              iconSize={18}
              iconPosition="end"
              onClick={() => setStep(2)}
              text="Begin attempt"
            />
            <Link className="attempt-link" to={`/${ROUTES.FAQ}`}>
              Read the rules first
            </Link>
          </div>
        </Motion.div>
      </div>
    </>
  );
};

export default TestIntro;
