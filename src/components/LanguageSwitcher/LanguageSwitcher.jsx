import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { LANGUAGES } from '@/i18n/config';
import './LanguageSwitcher.scss';

const LanguageSwitcher = ({ className }) => {
  const { i18n, t } = useTranslation();
  const active = i18n.resolvedLanguage;

  return (
    <div
      className={classNames('language-switcher', className)}
      role="group"
      aria-label={t('language.label')}
    >
      {LANGUAGES.map((language) => (
        <button
          key={language.code}
          type="button"
          className={classNames('language-switcher__option', {
            'language-switcher__option--active': active === language.code,
          })}
          aria-pressed={active === language.code}
          title={language.label}
          onClick={() => i18n.changeLanguage(language.code)}
        >
          {language.short}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
