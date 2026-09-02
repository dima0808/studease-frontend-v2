import classNames from 'classnames';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AuthButton = (props) => {
  const { title, isLoading } = props;
  const { t } = useTranslation();

  return (
    <button
      type="submit"
      disabled={isLoading}
      className={classNames('auth-form__button', {
        'auth-form__button--loading': isLoading,
      })}
    >
      <span>{isLoading ? t('common.oneMoment') : title}</span>
      <ArrowRight size={18} strokeWidth={2.5} />
    </button>
  );
};

export default AuthButton;
