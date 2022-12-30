import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Backend, GridlyBackendOptions } from 'i18next-gridly-backend';
import dev from './dev/translation.json';
import en from './en/translation.json';
import vi from './vi/translation.json';

const defaultOptions: GridlyBackendOptions = {
  apiKey: import.meta.env.VITE_API_KEY,
  viewId: import.meta.env.VITE_VIEW_ID,
};

const isProduction = import.meta.env.NODE_ENV === 'production';

const resources = {
  dev: {
    translation: dev,
  },
  en: {
    translation: en,
  },
  vi: {
    translation: vi,
  },
};

i18n
  .use(Backend)
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    // resources,
    debug: !isProduction,
    lng: 'en',
    backend: defaultOptions,
    saveMissing: true,
    fallbackLng: 'en',
  });

export default i18n;
