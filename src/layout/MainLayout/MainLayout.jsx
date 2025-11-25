import './MainLayout.scss';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/layout/Sidebar';
import Header from '@/layout/Header';
import { useEffect } from "react";

const MainLayout = () => {

  useEffect(() => {
    document.title = "Studease"
  }, []);

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-layout__container">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
