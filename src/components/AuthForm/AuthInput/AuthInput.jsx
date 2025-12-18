import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import classNames from 'classnames';

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

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  const value = watch ? watch(id) : '';

  return (
    <div className="auth-form__field">
      <input
        id={id}
        type={inputType}
        onChange={onChange}
        onBlur={onBlur}
        {...register(id, { required })}
        className={classNames('auth-form__input', {
          'auth-form__input--error': error,
        })}
        placeholder=" "
      />
      <label htmlFor={id} className="auth-form__label">
        {error ? error.message || `${label} is required` : label}
      </label>
      {/*{error && <p className="auth-form__error">{error.message || "This field is required"}</p>}*/}

      {isPassword && value?.length > 0 && (
        <button
          type="button"
          className="auth-form__toggle"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          title={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <AiOutlineEyeInvisible className="auth-form__icon" />
          ) : (
            <AiOutlineEye className="auth-form__icon" />
          )}
        </button>
      )}
    </div>
  );
};

export default AuthInput;
