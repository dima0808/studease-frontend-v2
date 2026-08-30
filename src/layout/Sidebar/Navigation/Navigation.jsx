import { ROUTES_NAV, ROUTES_NAV_SECONDARY } from '@/constants/routes';
import MenuItem from '@/components/MenuItem';
import { useSelector } from 'react-redux';
import './Navigation.scss';

const Navigation = ({ isCollapsed }) => {
  const { tests } = useSelector((state) => state.tests);
  const { collections } = useSelector((state) => state.collections);

  const counts = {
    '/tests': tests?.length || undefined,
    '/collections': collections?.length || undefined,
  };

  return (
    <nav className="sidebar__nav">
      <div className="sidebar__nav-main">
        {Object.values(ROUTES_NAV).map((item) => (
          <MenuItem
            isCollapsed={isCollapsed}
            key={item.href}
            count={counts[item.href]}
            {...item}
          />
        ))}
      </div>
      <hr className="sidebar__nav-rule" />
      <div className="sidebar__nav-secondary">
        <MenuItem isCollapsed={isCollapsed} {...ROUTES_NAV_SECONDARY.FAQ} />
      </div>
    </nav>
  );
};

export default Navigation;
