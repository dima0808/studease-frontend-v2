import './Timer.scss';

const Timer = ({ seconds }) => {
  const formatTime = () => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const pad = (n) => n.toString().padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  };

  if (seconds === 0) {
    return <div className="timer time-up">--:--:--</div>;
  }

  const timerClass = seconds <= 60 ? 'timer danger' : 'timer';

  return <div className={timerClass}>{formatTime()}</div>;
};

export default Timer;
