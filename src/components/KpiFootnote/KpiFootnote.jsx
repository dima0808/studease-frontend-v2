import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import './KpiFootnote.scss';

const KpiFootnote = ({ className, singleLine = false }) => {
  const { t } = useTranslation();

  return (
    <p
      className={classNames(
        'kpi-footnote',
        { 'kpi-footnote--single': singleLine },
        className,
      )}
    >
      {t('brand.institution')}
    </p>
  );
};

export default KpiFootnote;
