import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import SplashScreen from "@/components/SplashScreen";
import "./AuthLayout.scss";

const AuthLayout = () => {
  const { pathname } = useLocation();
  const isLoginPage = pathname === "/";
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="auth-layout">
      <SplashScreen showSplash={showSplash}/>

      {!showSplash && (
        <div className="auth-page">
          <h1 className="auth-page__title">StudEase</h1>
          <Outlet />
          {isLoginPage ? (
            <Link to="/register" className="auth-page__link">
              New to StudEase?<span>Sign Up</span>
            </Link>
          ) : (
            <Link to="/" className="auth-page__link">
              Already have an account?<span>Sign In</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default AuthLayout;