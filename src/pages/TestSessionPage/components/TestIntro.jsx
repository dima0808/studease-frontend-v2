import { useActions } from '@/hooks/useActions';
import Info from '@/components/ItemCard/components/Info';
import EndIcon from '@/components/icons/EndIcon';
import ScoreIcon from '@/components/icons/ScoreIcon';
import DurationIcon from '@/components/icons/DurationIcon';
import CountIcon from '@/components/icons/CountIcon';
import Important from '@/components/Important';
import Button from '@/components/Button';
import { motion as Motion } from 'framer-motion';
import FaqButton from '@/components/FaqButton';

const TestIntro = (props) => {
  const { name, deadline, questionsCount, minutesToComplete, maxScore } = props;
  const { setStep } = useActions();

  return (
    <>
      <FaqButton />
      <Motion.div
        className="test-intro"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <h1 className="test-intro__title">{name}</h1>

        <div className="test-intro__info">
          <Info title="Deadline" description={deadline} icon={EndIcon} />
          <Info
            title="Minutes to Complete"
            description={minutesToComplete}
            icon={DurationIcon}
          />
          <Info
            title="Questions count"
            description={questionsCount}
            icon={CountIcon}
          />
          <Info title="Max score" description={maxScore} icon={ScoreIcon} />
        </div>

        <div className="test-intro__actions">
          <Important text="Anti-cheat is on" />
          <Button theme="primary" onClick={() => setStep(2)} text="Next" />
        </div>
      </Motion.div>
    </>
  );
};

export default TestIntro;
