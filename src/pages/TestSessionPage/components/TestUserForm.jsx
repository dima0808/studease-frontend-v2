import { useForm } from 'react-hook-form';
import { motion as Motion } from 'framer-motion';
import AuthInput from '@/components/AuthForm/AuthInput';
import { useActions } from '@/hooks/useActions';
import Button from '@/components/Button';

const TestUserForm = ({ name }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setUserData, nextStep, prevStep } = useActions();

  const handleStart = (data) => {
    setUserData(data);
    nextStep();
  };

  return (
    <Motion.form
      className="test-user-form"
      onSubmit={handleSubmit(handleStart)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h1 className="test-intro__title">{name}</h1>

      <div className="test-user-form__content">
        <p className="test-user-form__subtitle">
          Enter your credential to start the test
        </p>
        <div className="test-user-form__inputs">
          <AuthInput
            id="group"
            label="Group"
            type="text"
            register={(name) =>
              register(name, {
                required: 'Group is required',
                pattern: {
                  value: /^\p{L}{2}-\d{2}$/u,
                  message: 'Format: XX-XX (e.g. IO-21)',
                },
              })
            }
            error={errors.group}
            required
          />
          <AuthInput
            id="fullName"
            label="Full name"
            type="text"
            register={(name) =>
              register(name, {
                required: 'Full name is required',
                pattern: {
                  value: /^\p{Lu}\p{L}+ \p{Lu}\p{L}+$/u,
                  message: 'Format: Surname Name (e.g. Ivanov Ivan)',
                },
              })
            }
            error={errors.fullName}
            required
          />
        </div>
      </div>

      <div className="test-intro__actions">
        <Button onClick={prevStep} text="Back" />
        <Button theme="primary" text="Start" type="submit" />
      </div>
    </Motion.form>
  );
};

export default TestUserForm;
