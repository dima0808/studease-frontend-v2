import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthInput from "@/components/AuthForm/AuthInput";
import AuthButton from "@/components/AuthForm/AuthButton";
import { useState } from "react";
import "../AuthForm.scss";

const LoginForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (data) => {
    console.log(data);
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      clearTimeout(timer);
      navigate("/dashboard");
    }, 5000);
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
    </form>
  );
};

export default LoginForm;
