import { LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useActions } from '@/hooks/useActions';
import { motion as Motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const SignOutButton = (props) => {
  const { isCollapsed } = props;
  const { logout } = useActions();
  const { t } = useTranslation();

  return (
    <Link
      to="/"
      onClick={() => logout()}
      title={isCollapsed ? t('sidebar.signOut') : undefined}
      className="sidebar__button"
      type="button"
    >
      <LogOut size={16} />
      {!isCollapsed && (
        <Motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {t('sidebar.signOut')}
        </Motion.span>
      )}
    </Link>
  );
};

export default SignOutButton;
