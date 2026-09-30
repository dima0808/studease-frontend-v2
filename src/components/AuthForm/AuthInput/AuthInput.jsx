import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

const AuthInput = ({
  id,
  label,
  type = 'text',
  register,
  required,
  onChange,
  onBlur,
  watch,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  const value = watch ? watch(id) : '';

  return (
    <div className="auth-form__field">
      <label htmlFor={id} className="auth-form__label">
        {label}
      </label>

      <input
        id={id}
        type={inputType}
        onChange={onChange}
        onBlur={onBlur}
        {...register(id, { required })}
        className={classNames('auth-form__input', {
          'auth-form__input--error': error,
        })}
        aria-invalid={!!error}
      />

      {isPassword && value?.length > 0 && (
        <button
          type="button"
          className="auth-form__toggle"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={
            showPassword ? t('auth.hidePassword') : t('auth.showPassword')
          }
          title={
            showPassword ? t('auth.hidePassword') : t('auth.showPassword')
          }
        >
          {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      )}

      {error && (
        <p className="auth-form__error">
          {error.message || t('auth.errors.fieldRequired', { field: label })}
        </p>
      )}
    </div>
  );
};

export default AuthInput;
