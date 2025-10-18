import './MenuItem.scss';
import classNames from 'classnames';
import { icons } from '@/components/icons';
import { NavLink } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';

const MenuItem = (props) => {
  const { className, iconName, title, href, isCollapsed } = props;
  const IconComponent = icons[iconName];

  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        classNames('menu-item', className, { 'menu-item--active': isActive })
      }
    >
      {IconComponent && <IconComponent className="menu-item__icon" />}
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
    </NavLink>
  );
};

export default MenuItem;
