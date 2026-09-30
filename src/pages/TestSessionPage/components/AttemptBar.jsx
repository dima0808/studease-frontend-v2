import classNames from 'classnames';
import Lockup from '@/components/Lockup';

/**
 * The bar at the top of every attempt screen: the lockup, and whatever the
 * screen needs on the right. Ruled only where a rule separates work below it.
 */
const AttemptBar = ({ ruled = false, children }) => (
  <div className={classNames('attempt__bar', { 'attempt__bar--ruled': ruled })}>
    <Lockup markSize={18} typeSize={15} />
    {children}
  </div>
);

export default AttemptBar;
