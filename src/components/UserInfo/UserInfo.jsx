import userIcon from '@/assets/icons/user.svg';
import './UserInfo.scss';

const UserInfo = () => {
  return (
    <div className="user-info">
      <img className="user-info__img" src={userIcon} alt="User icon" />
      <div className="user-info__wrapper">
        <p className="user-info__name">Skorobohatov Ihor</p>
        <p className="user-info__group">IO-25</p>
      </div>
    </div>
  );
};

export default UserInfo;
