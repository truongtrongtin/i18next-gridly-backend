import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import GridlyBackend, { GridlyBackendOptions } from 'i18next-gridly-backend';
import { initReactI18next } from 'react-i18next';

const backendOptions: GridlyBackendOptions = {
  apiKey: import.meta.env.VITE_API_KEY,
  viewId: import.meta.env.VITE_VIEW_ID,
};

const isProduction = import.meta.env.NODE_ENV === 'production';

i18n
  .use(GridlyBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    backend: backendOptions,
    saveMissing: !isProduction,
  });

export default i18n;
