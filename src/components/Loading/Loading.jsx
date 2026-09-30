import './Loading.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

const Loading = ({ className, text }) => {
  const { t } = useTranslation();

  return (
    <div className={classNames('loading', className)}>
      <div className="loading__dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p className="loading__text">{t('common.loading', { item: text })}</p>
    </div>
  );
};

export default Loading;
