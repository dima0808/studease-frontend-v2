import classNames from 'classnames';
import './Timer.scss';

// Under five minutes the clock turns accent. It never pulses, never scales,
// never changes size.
const DANGER_THRESHOLD_SECONDS = 300;

const Timer = ({ seconds }) => {
  // `null` means we do not know the deadline yet, `0` means time is up.
  const isUnknown = seconds === null || seconds === undefined;

  const pad = (n) => n.toString().padStart(2, '0');
  const formatted = isUnknown
    ? '--:--:--'
    : [
        Math.floor(seconds / 3600),
        Math.floor((seconds % 3600) / 60),
        seconds % 60,
      ]
        .map(pad)
        .join(':');

  return (
    <div
      className={classNames('timer', {
        'timer--up': isUnknown || seconds === 0,
        'timer--danger':
          !isUnknown && seconds > 0 && seconds <= DANGER_THRESHOLD_SECONDS,
      })}
    >
      <span className="timer__value">{formatted}</span>
      <span className="timer__label">left</span>
    </div>
  );
};

export default Timer;
