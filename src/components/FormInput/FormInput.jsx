import './FormInput.scss';

const FormInput = (props) => {
  const { label, name, type = 'text', register, rules, errors } = props;

  const hasError = !!errors[name];

  return (
    <div className="form-input">
      <input
        type={type}
        placeholder=" "
        {...register(name, rules)}
        className={
          hasError
            ? 'form-input__input form-input__input--error'
            : 'form-input__input'
        }
      />

      <label
        className={
          hasError
            ? 'form-input__label form-input__label--error'
            : 'form-input__label'
        }
      >
        {hasError ? errors[name].message : label}
      </label>
    </div>
  );
};

export default FormInput;
