import classNames from 'classnames';
import './FormInput.scss';

/**
 * Label above the field and it stays there; the error goes beneath, so a
 * student never loses track of which field they are in.
 */
const FormInput = (props) => {
  const { label, name, type = 'text', register, rules, errors } = props;

  const error = errors?.[name];

  return (
    <div className="form-input">
      {label && (
        <label className="form-input__label" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        {...register(name, rules)}
        className={classNames('form-input__input', {
          'form-input__input--error': !!error,
        })}
        aria-invalid={!!error}
      />
      {error && <span className="form-input__error">{error.message}</span>}
    </div>
  );
};

export default FormInput;
