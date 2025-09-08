import { Link, Outlet, useLocation } from "react-router-dom";
import './AuthLayout.scss'

const AuthLayout = () => {
  const { pathname } = useLocation();
  const isLoginPage = pathname === '/';

  return (
    <div className="auth-page">
      <h1 className="auth-page__title">StudEase</h1>
      <Outlet />
      {isLoginPage ? (
        <Link to="/register" className="auth-page__link">New to StudEase?<span>Sign Up</span></Link>
      ) : (
        <Link to="/" className="auth-page__link">Already have an account?<span>Sign In</span></Link>
      )}
    </div>
  )
}

export default AuthLayout