import classNames from 'classnames';
import './TickStrip.scss';

/**
 * The tick strip — one rectangle per question, laid out flush to a baseline.
 * Answered ticks stand at 10px in ink, the current one at 14px in accent, the
 * rest at 6px in neutral. On a card it renders uniform, which incidentally
 * tells the student how long the test is.
 */
const TickStrip = ({
  total = 0,
  answered = 0,
  current,
  uniform = false,
  className,
}) => {
  if (!total) return null;

  return (
    <div
      className={classNames(
        'tick-strip',
        { 'tick-strip--uniform': uniform },
        className,
      )}
      aria-hidden="true"
    >
      {Array.from({ length: total }, (_, index) => {
        const number = index + 1;
        const state = uniform
          ? 'uniform'
          : number === current
            ? 'current'
            : number <= answered
              ? 'answered'
              : 'unanswered';

        return (
          <span
            key={number}
            className={`tick-strip__tick tick-strip__tick--${state}`}
          />
        );
      })}
    </div>
  );
};

export default TickStrip;
