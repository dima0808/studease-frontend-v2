import { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useActions } from '@/hooks/useActions';
import Lockup from '@/components/Lockup';
import KpiFootnote from '@/components/KpiFootnote';
import './AuthLayout.scss';
import { ROUTES } from '@/constants/routes';

const AuthLayout = () => {
  const { pathname } = useLocation();
  const isLoginPage = pathname === '/';
  const navigate = useNavigate();
  const { clearError } = useActions();

  // A token already in hand means there is nothing to sign in for. Go, without
  // three seconds of splash screen in between.
  useEffect(() => {
    if (Cookies.get('token')) {
      navigate(`/${ROUTES.TESTS}`, { replace: true });
    }
  }, [navigate]);

  return (
    <div className="auth-page">
      <Lockup className="auth-page__lockup" />

      <div className="auth-page__body">
        <div className="auth-page__grid">
          <div className="auth-page__pitch">
            <h1 className="auth-page__title">
              {isLoginPage ? (
                <>
                  Sit down.
                  <br />
                  Sign in.
                  <br />
                  Begin.
                </>
              ) : (
                <>
                  One account.
                  <br />
                  Every attempt
                  <br />
                  you make.
                </>
              )}
            </h1>
            <hr className="auth-page__rule" />
            <p className="auth-page__lede">
              Your tests, your attempts, your record — kept in one place and
              nowhere else.
            </p>
          </div>

          <div className="auth-page__form">
            <Outlet />

            {isLoginPage ? (
              <p className="auth-page__link">
                First time here?{' '}
                <Link to="/register" onClick={() => clearError()}>
                  Register with your student ID
                </Link>
              </p>
            ) : (
              <p className="auth-page__link">
                Already have an account?{' '}
                <Link to="/" onClick={() => clearError()}>
                  Sign in
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>

      <KpiFootnote className="auth-page__footnote" singleLine />
    </div>
  );
};

export default AuthLayout;
