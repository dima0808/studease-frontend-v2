import classNames from 'classnames';
import { ArrowRight } from 'lucide-react';

const AuthButton = (props) => {
  const { title, isLoading } = props;

  return (
    <button
      type="submit"
      disabled={isLoading}
      className={classNames('auth-form__button', {
        'auth-form__button--loading': isLoading,
      })}
    >
      <span>{isLoading ? 'One moment' : title}</span>
      <ArrowRight size={18} strokeWidth={2.5} />
    </button>
  );
};

export default AuthButton;
