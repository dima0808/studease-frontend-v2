import classNames from 'classnames';
import GaugeMark from '@/components/icons/GaugeMark';
import './Lockup.scss';

/**
 * The gauge mark plus STUDEASE. Replaces the gradient wordmark everywhere.
 */
const Lockup = ({ markSize = 20, typeSize = 16, markOnly = false, className }) => (
  <span className={classNames('lockup', className)}>
    <GaugeMark size={markSize} className="lockup__mark" />
    {!markOnly && (
      <span className="lockup__type" style={{ fontSize: `${typeSize}px` }}>
        StudEase
      </span>
    )}
  </span>
);

export default Lockup;
