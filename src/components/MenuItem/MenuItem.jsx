import './MenuItem.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';

const MenuItem = (props) => {
  const { className, icon: Icon, title, href, isCollapsed, count, flag } =
    props;

  return (
    <NavLink
      title={isCollapsed ? title : undefined}
      to={href}
      className={({ isActive }) =>
        classNames('menu-item', className, { 'menu-item--active': isActive })
      }
    >
      {Icon && <Icon size={17} className="menu-item__icon" />}
      {!isCollapsed && (
        <Motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="menu-item__title"
        >
          {title}
        </Motion.span>
      )}
      {!isCollapsed && flag && <span className="menu-item__flag">{flag}</span>}
      {!isCollapsed && count !== undefined && count !== null && (
        <span className="menu-item__count">{count}</span>
      )}
    </NavLink>
  );
};

export default MenuItem;
