import UserInfo from '@/components/UserInfo';
import CollapseButton from '@/layout/Sidebar/ToggleButton';
import Navigation from './Navigation';
import SignOutButton from '@/layout/Sidebar/SignOutButton';
import Lockup from '@/components/Lockup';
import KpiFootnote from '@/components/KpiFootnote';
import classNames from 'classnames';
import './Sidebar.scss';
import { useSelector } from 'react-redux';
import { useActions } from '@/hooks/useActions';

const Sidebar = () => {
  const { isCollapsed } = useSelector((state) => state.filter);
  const { setIsCollapsed } = useActions();

  return (
    <header
      className={classNames('sidebar', { 'sidebar--collapsed': isCollapsed })}
    >
      <Lockup markOnly={isCollapsed} className="sidebar__lockup" />

      <hr className="sidebar__rule sidebar__rule--strong sidebar__rule--lockup" />

      <Navigation isCollapsed={isCollapsed} />

      <div className="sidebar__foot">
        <hr className="sidebar__rule sidebar__rule--strong" />

        <UserInfo isCollapsed={isCollapsed} />

        <div className="sidebar__actions">
          <SignOutButton isCollapsed={isCollapsed} />
          <CollapseButton
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
        </div>

        {!isCollapsed && <KpiFootnote className="sidebar__footnote" />}
      </div>
    </header>
  );
};

export default Sidebar;
