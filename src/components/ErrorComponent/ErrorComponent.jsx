import { RotateCw } from 'lucide-react';
import Button from '@/components/Button';
import { useTranslation } from 'react-i18next';
import './ErrorComponent.scss';

const ErrorComponent = ({ onRetry, description }) => {
  const { t } = useTranslation();

  return (
    <div className="error-component">
      <p className="error-component__kicker">{t('error.kicker')}</p>
      <h2 className="error-component__title">{description}</h2>
      <hr className="error-component__rule" />
      <p className="error-component__text">{t('error.text')}</p>
      <Button
        icon={RotateCw}
        text={t('common.tryAgain')}
        theme="primary"
        size="lg"
        className="error-component__btn"
        onClick={onRetry}
      />
    </div>
  );
};

export default ErrorComponent;
