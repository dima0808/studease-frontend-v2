import { useForm } from 'react-hook-form';
import { motion as Motion } from 'framer-motion';
import AuthInput from '@/components/AuthForm/AuthInput';
import { useActions } from '@/hooks/useActions';
import Button from '@/components/Button';
import { useSelector } from 'react-redux';

const UKRAINIAN_LETTERS = 'А-ЩЬЮЯЄІЇҐа-щьюяєіїґ';
const GROUP_PATTERN = new RegExp(
  `^[А-ЩЬЮЯЄІЇҐ]{2}-[${UKRAINIAN_LETTERS}]?\\d{2}[${UKRAINIAN_LETTERS}]?$`,
);
const NAME_PART = `[А-ЩЬЮЯЄІЇҐ][${UKRAINIAN_LETTERS}]*(?:[-'’][${UKRAINIAN_LETTERS}]+)*`;
const STUDENT_NAME_PATTERN = new RegExp(
  `^${NAME_PART}(?:\\s+${NAME_PART}){1,2}$`,
);

const TestUserForm = ({ name }) => {
  const { credentials, testInfo } = useSelector((state) => state.testSession);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...credentials },
  });

  const { setCredentials, setStep, startTestSession } = useActions();

  const handleStart = (data) => {
    setCredentials(data);
    startTestSession({
      testId: testInfo.id,
      credentials: data,
    });
    setStep(3);
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
        <div className="test-user-form__example">
          <p>Приклад заповнення:</p>
          <p>Група: ІО-25, ІО-25з або ІО-м25і</p>
          <p>ПІБ: Водоп&apos;янов Іван або Іваненко Іван Іванович</p>
        </div>

        <div className="test-user-form__inputs">
          <AuthInput
            id="studentGroup"
            label="Група"
            type="text"
            register={(name) =>
              register(name, {
                required: 'Група є обовʼязковою',
                setValueAs: (value) => value.trim(),
                pattern: {
                  value: GROUP_PATTERN,
                  message:
                    'Формат групи: ІО-25, ІО-25з або ІО-м25і',
                },
              })
            }
            error={errors.studentGroup}
            required
          />
          <AuthInput
            id="studentName"
            label="Прізвище та імʼя"
            type="text"
            register={(name) =>
              register(name, {
                required: 'ПІБ є обовʼязковим',
                setValueAs: (value) => value.trim().replace(/\s+/g, ' '),
                pattern: {
                  value: STUDENT_NAME_PATTERN,
                  message:
                    'Використовуйте українські літери: Прізвище Імʼя або Прізвище Імʼя По батькові',
                },
              })
            }
            error={errors.studentName}
            required
          />
        </div>
      </div>

      <div className="test-intro__actions">
        <Button onClick={() => setStep(1)} text="Back" />
        <Button theme="primary" text="Start" type="submit" />
      </div>
    </Motion.form>
  );
};

export default TestUserForm;
