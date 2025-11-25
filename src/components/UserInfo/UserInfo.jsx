import userIcon from '@/assets/icons/user.svg';
import { AlertCircle } from 'lucide-react';
import './UserInfo.scss';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useActions } from '@/hooks/useActions';

import { Link } from 'react-router-dom';

const UserInfo = () => {
  const { user, error } = useSelector((state) => state.auth);
  const { getCurrentUser } = useActions();

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  if (error) {
    return (
      <div className="user-info__error">
        <div className="user-info__error-header">
          <AlertCircle className="error-icon" size={20} />
          <p className="error-text">{error}</p>
        </div>

        <Link className="user-info__error-link" to="/">
          Go to login page
        </Link>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="user-info">
      <img className="user-info__img" src={userIcon} alt="User icon" />
      <div className="user-info__wrapper">
        <p className="user-info__name">
          {user?.lastName} {user?.firstName}
        </p>
        <p className="user-info__group">{user?.email}</p>
      </div>
    </div>
  );
};

export default UserInfo;
