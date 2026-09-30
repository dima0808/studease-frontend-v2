import classNames from 'classnames';
import './Important.scss';

/**
 * The monitored notice — a square, a line of accent-700 text. Not an alert box:
 * a red-bordered panel in an exam raises stress rather than attention.
 */
const Important = (props) => {
  const { text, className } = props;
  return (
    <p className={classNames('important', className)}>
      <span className="important__mark" aria-hidden="true" />
      <span>{text}</span>
    </p>
  );
};

export default Important;
