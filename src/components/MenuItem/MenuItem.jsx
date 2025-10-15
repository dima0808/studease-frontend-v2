import './MenuItem.scss'
import classNames from "classnames";
import { icons } from "@/components/icons";
import { NavLink } from "react-router-dom";

const MenuItem = (props) => {
  const { className, iconName, title, href } = props
  const IconComponent = icons[iconName];

  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        classNames('menu-item', className, { 'menu-item--active': isActive })
      }
    >
      {IconComponent && <IconComponent className="menu-item__icon" />}
      <span className="menu-item__title">{title}</span>
    </NavLink>
  );
};

export default MenuItem;
