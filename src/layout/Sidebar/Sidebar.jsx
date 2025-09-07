import { useState } from "react";
import UserInfo from "@/components/UserInfo";
import ToggleButton from "@/layout/Sidebar/ToggleButton";
import Navigation from "./Navigation";
import SignOutButton from "@/layout/Sidebar/SignOutButton";
import "./Sidebar.scss";
import classNames from "classnames";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);


  return (
    <header className={classNames("sidebar", { "sidebar--collapsed": isCollapsed })}>
      <h1 className="sidebar__title">StudEase</h1>

      <Navigation />
      {!isCollapsed && <UserInfo />}

      <div className="sidebar__actions">
        <SignOutButton isCollapsed={isCollapsed} />
        <ToggleButton isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>
    </header>
  );
};

export default Sidebar;
