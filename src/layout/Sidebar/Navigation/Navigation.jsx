import { ROUTES_NAV, ROUTES_NAV_SECONDARY } from '@/constants/routes';
import MenuItem from '@/components/MenuItem';

const Navigation = ({ isCollapsed }) => {
  return (
    <nav className="sidebar__nav">
      <div className="sidebar__nav-main">
        {Object.values(ROUTES_NAV).map((item, index) => (
          <MenuItem isCollapsed={isCollapsed} key={index} {...item} />
        ))}
      </div>
      <div className="sidebar__nav-secondary">
        <MenuItem isCollapsed={isCollapsed} {...ROUTES_NAV_SECONDARY.FAQ} />
      </div>
    </nav>
  );
};

export default Navigation;
