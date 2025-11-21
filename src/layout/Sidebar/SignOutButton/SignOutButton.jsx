import SingOutIcon from '@/components/icons/SingOutIcon';
import { Link } from 'react-router-dom';
import { useActions } from '@/hooks/useActions';
import { motion as Motion } from 'framer-motion';

const SignOutButton = (props) => {
  const { isCollapsed } = props;
  const { logout } = useActions();

  return (
    <Link
      to="/"
      onClick={() => logout()}
      title={isCollapsed && 'Sign out'}
      className="sidebar__button"
      type="button"
    >
      <SingOutIcon />
      {!isCollapsed && (
        <Motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Sign out
        </Motion.span>
      )}
    </Link>
  );
};

export default SignOutButton;
