import { AlertCircle } from 'lucide-react';
import './UserInfo.scss';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useActions } from '@/hooks/useActions';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';

const UserInfo = ({ isCollapsed }) => {
  const { user, error } = useSelector((state) => state.auth);
  const { getCurrentUser } = useActions();
  const { t } = useTranslation();

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  if (error) {
    return (
      <div className="user-info__error">
        <div className="user-info__error-header">
          <AlertCircle className="error-icon" size={18} />
          {!isCollapsed && <p className="error-text">{error}</p>}
        </div>

        {!isCollapsed && (
          <Link className="user-info__error-link" to="/">
            {t('sidebar.goToSignIn')}
          </Link>
        )}
      </div>
    );
  }

  if (!user || isCollapsed) return null;

  // The name carries the block; there is no avatar.
  const identity = [user?.group, user?.email].filter(Boolean).join(' · ');

  return (
    <div className="user-info">
      <p className="user-info__name">
        {user?.lastName} {user?.firstName}
      </p>
      {identity && <p className="user-info__group">{identity}</p>}
    </div>
  );
};

export default UserInfo;
