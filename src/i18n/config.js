import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import uk from './locales/uk.json';

export const LANGUAGES = [
  { code: 'uk', label: 'Українська', short: 'УКР' },
  { code: 'en', label: 'English', short: 'EN' },
];

export const DEFAULT_LANGUAGE = 'uk';
const STORAGE_KEY = 'studease-language';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      uk: { translation: uk },
    },
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: LANGUAGES.map((language) => language.code),
    load: 'languageOnly',
    interpolation: { escapeValue: false },
    detection: {
      // Only an explicit choice overrides Ukrainian — the browser locale is
      // deliberately not consulted, so an English-locale browser still opens
      // the app in Ukrainian.
      order: ['localStorage'],
      lookupLocalStorage: STORAGE_KEY,
      caches: ['localStorage'],
    },
  });

const syncHtmlLang = (language) => {
  document.documentElement.lang = language;
};

syncHtmlLang(i18n.resolvedLanguage);
i18n.on('languageChanged', syncHtmlLang);

export default i18n;
