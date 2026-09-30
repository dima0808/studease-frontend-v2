import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthButton from '@/components/AuthForm/AuthButton';
import AuthInput from '@/components/AuthForm/AuthInput';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useActions } from '@/hooks/useActions';
import '../AuthForm.scss';
import { ROUTES } from '@/constants/routes';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { registerUser } = useActions();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { isLoading, error } = useSelector((state) => state.auth);

  const handleRegister = async (data) => {
    await registerUser(data).unwrap();
    navigate(`/${ROUTES.TESTS}`);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(handleRegister)}>
      <AuthInput
        id="email"
        label={t('auth.email')}
        type="text"
        register={(name) =>
          register(name, {
            required: t('auth.errors.emailRequired'),
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t('auth.errors.emailInvalid'),
            },
          })
        }
        error={errors.email}
      />

      <AuthInput
        id="firstName"
        label={t('auth.firstName')}
        type="text"
        register={(name) =>
          register(name, {
            required: t('auth.errors.firstNameRequired'),
          })
        }
        error={errors.firstName}
      />

      <AuthInput
        id="lastName"
        label={t('auth.lastName')}
        type="text"
        register={(name) =>
          register(name, {
            required: t('auth.errors.lastNameRequired'),
          })
        }
        error={errors.lastName}
      />

      <AuthInput
        id="password"
        label={t('auth.password')}
        type="password"
        register={register}
        error={errors.password}
        watch={watch}
        required
      />

      <AuthInput
        id="repeatPassword"
        label={t('auth.repeatPassword')}
        type="password"
        register={(name) =>
          register(name, {
            required: t('auth.errors.repeatRequired'),
            validate: (value) =>
              value === watch('password') ||
              t('auth.errors.passwordsMismatch'),
          })
        }
        error={errors.repeatPassword}
        watch={watch}
      />

      <AuthButton isLoading={isLoading} title={t('auth.signUp')} />
      {error && <p className="auth-form__error-description">{error}</p>}
    </form>
  );
};

export default RegisterForm;
