import userIcon from '@/assets/icons/user.svg';
import './UserInfo.scss';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useActions } from "@/hooks/useActions";

const UserInfo = () => {
  const { user } = useSelector((state) => state.auth);
  const { getCurrentUser } = useActions()

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  console.log(user);
  return (
    <>
      {user ? <div className="user-info">
        <img className="user-info__img" src={userIcon} alt="User icon" />
        <div className="user-info__wrapper">
          <p className="user-info__name">{user?.lastName} {user?.firstName}</p>
          <p className="user-info__group">{user?.email}</p>
        </div>
      </div> : null}

    </>
  );
};

export default UserInfo;
