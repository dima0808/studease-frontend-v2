import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import AuthInput from "@/components/AuthForm/AuthInput";
import AuthButton from "@/components/AuthForm/AuthButton";
import { useSelector } from "react-redux";
import { useActions } from "@/hooks/useActions";
import "../AuthForm.scss";

const LoginForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth)
  const { loginUser } = useActions()
  const { handleShowSplash } = useOutletContext();

  const handleLogin = async (data) => {
    await loginUser(data).unwrap();
    handleShowSplash(() => navigate("/dashboard"));
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(handleLogin)}>
      <AuthInput
        id="email"
        label="Email"
        type="text"
        register={(name) =>
          register(name, {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })
        }
        error={errors.email}
        required
      />
      <AuthInput
        id="password"
        label="Password"
        type="password"
        register={register}
        error={errors.password}
        watch={watch}
        required
      />
      <AuthButton isLoading={isLoading} title="Sign in"/>
      {error && <p className="auth-form__error-description">{error}</p>}
    </form>
  );
};

export default LoginForm;
