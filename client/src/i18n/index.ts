import i18n from "i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";

interface DetectionOptions {
  order: Array<string>;
  caches?: Array<string>;
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'hy',
    keySeparator: '.',
    lng: 'hy',
    debug: false,
    detection: {
      order: ['path'],
      caches: ['cookie'],
      lookupFromPathIndex: 0,
    } as DetectionOptions,
    backend: {
      loadPath: '/public/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false
    },
  });


export default i18n;