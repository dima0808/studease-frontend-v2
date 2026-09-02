import Button from '@/components/Button';
import { Plus } from 'lucide-react';
import './EmptyData.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { ROUTES, ROUTES_NAV } from '@/constants/routes';

const EmptyData = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const isCollectionsPage = pathname === ROUTES_NAV.COLLECTIONS.href;
  const singularKey = isCollectionsPage ? 'collection' : 'test';

  return (
    <div className="empty-data">
      <p className="empty-data__kicker">{t('empty.kicker')}</p>
      <h2 className="empty-data__title">
        <Trans i18nKey="empty.title" components={{ 1: <br /> }} />
      </h2>
      <hr className="empty-data__rule" />
      <p className="empty-data__text">{t(`empty.text_${singularKey}`)}</p>
      <Button
        onClick={() =>
          navigate(
            `/${isCollectionsPage ? ROUTES.CREATE_COLLECTION : ROUTES.CREATE_TEST}`,
          )
        }
        icon={Plus}
        text={t(`empty.create_${singularKey}`)}
        theme="primary"
        size="lg"
        className="empty-data__btn"
      />
    </div>
  );
};

export default EmptyData;
