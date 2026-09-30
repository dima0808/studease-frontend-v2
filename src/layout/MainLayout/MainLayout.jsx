import './MainLayout.scss';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/layout/Sidebar';
import Header from '@/layout/Header';
import classNames from 'classnames';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES_NAV } from '@/constants/routes';

const MainLayout = () => {
  const { isCollapsed } = useSelector((state) => state.filter);
  const { pathname } = useLocation();

  // The header belongs to the list pages; Courseboards speaks for itself.
  const hasHeader =
    pathname === ROUTES_NAV.TESTS.href ||
    pathname === ROUTES_NAV.COLLECTIONS.href;

  useEffect(() => {
    document.title = 'StudEase';
  }, []);

  return (
    <div
      className={classNames('main-layout', {
        'main-layout--collapsed': isCollapsed,
      })}
    >
      <Sidebar />
      <div className="main-layout__container">
        {hasHeader && <Header />}
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
