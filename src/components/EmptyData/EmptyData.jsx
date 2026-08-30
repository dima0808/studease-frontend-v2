import Button from '@/components/Button';
import { Plus } from 'lucide-react';
import './EmptyData.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES, ROUTES_NAV } from '@/constants/routes';

const EmptyData = ({ name }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isCollectionsPage = pathname === ROUTES_NAV.COLLECTIONS.href;
  const singular = name.slice(0, -1);

  return (
    <div className="empty-data">
      <p className="empty-data__kicker">Nothing to show</p>
      <h2 className="empty-data__title">
        No {name}
        <br />
        match this view.
      </h2>
      <hr className="empty-data__rule" />
      <p className="empty-data__text">
        Either the filters are too narrow or there is nothing here yet. Clear
        the search, switch tabs, or start a new {singular}.
      </p>
      <Button
        onClick={() =>
          navigate(
            `/${isCollectionsPage ? ROUTES.CREATE_COLLECTION : ROUTES.CREATE_TEST}`,
          )
        }
        icon={Plus}
        text={`Create a ${singular}`}
        theme="primary"
        size="lg"
        className="empty-data__btn"
      />
    </div>
  );
};

export default EmptyData;
