import './Timer.scss';

const Timer = ({ seconds }) => {
  // `null` means we do not know the deadline yet, `0` means time is up.
  if (seconds === null || seconds === undefined) {
    return <div className="timer time-up">--:--:--</div>;
  }

  const pad = (n) => n.toString().padStart(2, '0');
  const formatted = [
    Math.floor(seconds / 3600),
    Math.floor((seconds % 3600) / 60),
    seconds % 60,
  ]
    .map(pad)
    .join(':');

  if (seconds === 0) {
    return <div className="timer time-up">{formatted}</div>;
  }

  return (
    <div className={seconds <= 60 ? 'timer danger' : 'timer'}>{formatted}</div>
  );
};

export default Timer;
