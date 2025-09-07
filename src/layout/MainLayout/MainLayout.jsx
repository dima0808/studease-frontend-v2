import './MainLayout.scss'
import { Outlet } from "react-router-dom";
import Sidebar from "@/layout/Sidebar";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Sidebar/>
      <div className="container">
        <Outlet/>
      </div>
    </div>
  )
}

export default MainLayout