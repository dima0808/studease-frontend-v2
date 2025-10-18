const FormInput = (props) => {
  const {
    label,
    name,
    type = 'text',
    placeholder,
    register,
    rules,
    errors,
  } = props;

  return (
    <div className="form-input">
      <label>{label}</label>
      <input type={type} placeholder={placeholder} {...register(name, rules)} />
      {errors[name] && <p style={{ color: 'red' }}>{errors[name].message}</p>}
    </div>
  );
};

export default FormInput;
