import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import SplashScreen from "@/components/SplashScreen";
import Cookies from "js-cookie";
import { useActions } from "@/hooks/useActions";
import "./AuthLayout.scss";
import { ROUTES } from "@/constants/routes";

const AuthLayout = () => {
  const { pathname } = useLocation();
  const isLoginPage = pathname === "/";
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(false);
  const { clearError } = useActions();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setShowSplash(true);
      const timer = setTimeout(() => {
        setShowSplash(false);
        navigate(`/${ROUTES.TESTS}`);
        clearTimeout(timer);
      }, 3000);
    }
  }, [navigate]);

  const handleShowSplash = (callback) => {
    setShowSplash(true);

    const timer = setTimeout(() => {
      setShowSplash(false);
      if (callback) callback();
      clearTimeout(timer);
    }, 3000);
  };

  return (
    <div className="auth-layout">
      <SplashScreen showSplash={showSplash} />

      {!showSplash && (
        <div className="auth-page">
          <h1 className="auth-page__title">StudEase</h1>
          <Outlet context={{ handleShowSplash }} />
          {isLoginPage ? (
            <Link to="/register" onClick={() => clearError()} className="auth-page__link">
              New to StudEase?<span>Sign Up</span>
            </Link>
          ) : (
            <Link to="/" onClick={() => clearError()} className="auth-page__link">
              Already have an account?<span>Sign In</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default AuthLayout;
