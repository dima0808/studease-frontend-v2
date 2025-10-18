import { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import UserInfo from '@/components/UserInfo';
import ToggleButton from '@/layout/Sidebar/ToggleButton';
import Navigation from './Navigation';
import SignOutButton from '@/layout/Sidebar/SignOutButton';
import classNames from 'classnames';
import './Sidebar.scss';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <header
      className={classNames('sidebar', { 'sidebar--collapsed': isCollapsed })}
    >
      <h1 className="sidebar__title">StudEase</h1>

      <Navigation isCollapsed={isCollapsed} />

      <AnimatePresence mode="wait">
        {!isCollapsed && (
          <Motion.div
            key="user-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <UserInfo />
          </Motion.div>
        )}
      </AnimatePresence>

      <div className="sidebar__actions">
        <SignOutButton isCollapsed={isCollapsed} />
        <ToggleButton
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>
    </header>
  );
};

export default Sidebar;
