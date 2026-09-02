import { Fragment, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useActions } from '@/hooks/useActions';
import Lockup from '@/components/Lockup';
import KpiFootnote from '@/components/KpiFootnote';
import './AuthLayout.scss';
import { ROUTES } from '@/constants/routes';

const AuthLayout = () => {
  const { pathname } = useLocation();
  const isLoginPage = pathname === '/';
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { clearError } = useActions();

  const renderMultiline = (value) =>
    value.split('\n').map((line, index, lines) => (
      <Fragment key={line + index}>
        {line}
        {index < lines.length - 1 && <br />}
      </Fragment>
    ));

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
              {renderMultiline(
                isLoginPage ? t('auth.loginTitle') : t('auth.registerTitle'),
              )}
            </h1>
            <hr className="auth-page__rule" />
            <p className="auth-page__lede">{t('auth.lede')}</p>
          </div>

          <div className="auth-page__form">
            <Outlet />

            {isLoginPage ? (
              <p className="auth-page__link">
                {t('auth.firstTime')}{' '}
                <Link to="/register" onClick={() => clearError()}>
                  {t('auth.registerLink')}
                </Link>
              </p>
            ) : (
              <p className="auth-page__link">
                {t('auth.haveAccount')}{' '}
                <Link to="/" onClick={() => clearError()}>
                  {t('auth.signInLink')}
                </Link>
              </p>
            )}

            <LanguageSwitcher className="auth-page__language" />
          </div>
        </div>
      </div>

      <KpiFootnote className="auth-page__footnote" singleLine />
    </div>
  );
};

export default AuthLayout;
