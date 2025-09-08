import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthButton from "@/components/AuthForm/AuthButton";
import AuthInput from "@/components/AuthForm/AuthInput";
import "../AuthForm.scss";
import { useState } from "react";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (data) => {
    console.log(data);
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      clearTimeout(timer);
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(handleRegister)}>
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
      />

      <AuthInput
        id="firstName"
        label="First name"
        type="text"
        register={(name) =>
          register(name, {
            required: "First name is required",
          })
        }
        error={errors.firstName}
      />

      <AuthInput
        id="lastName"
        label="Last name"
        type="text"
        register={(name) =>
          register(name, {
            required: "Last name is required",
          })
        }
        error={errors.lastName}
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

      <AuthInput
        id="repeatPassword"
        label="Repeat password"
        type="password"
        register={(name) =>
          register(name, {
            required: "Please repeat your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })
        }
        error={errors.repeatPassword}
        watch={watch}
      />

      <AuthButton isLoading={isLoading} title="Sign up" />
    </form>
  );
};

export default RegisterForm;
