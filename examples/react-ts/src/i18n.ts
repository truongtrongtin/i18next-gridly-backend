import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import GridlyBackend, { GridlyBackendOptions } from 'i18next-gridly-backend';
import { initReactI18next } from 'react-i18next';

const isProduction = import.meta.env.PROD;
const gridlyOptions: GridlyBackendOptions = {
  apiKey: import.meta.env.VITE_API_KEY,
  viewId: import.meta.env.VITE_VIEW_ID,
};

i18n
  .use(LanguageDetector)
  .use(GridlyBackend)
  .use(initReactI18next)
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    backend: gridlyOptions,
    saveMissing: !isProduction,
  });

export default i18n;
