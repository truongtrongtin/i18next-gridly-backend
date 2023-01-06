import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Backend, GridlyBackendOptions } from 'i18next-gridly-backend';

const backendOptions: GridlyBackendOptions = {
  apiKey: '8YmoZUJHkXCOJv',
  viewId: '1562l4z5lvm6qeq',
};

const isProduction = import.meta.env.NODE_ENV === 'production';

i18n
  .use(Backend)
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    // resources,
    debug: !isProduction,
    lng: 'en',
    fallbackLng: 'en',
    backend: backendOptions,
    saveMissing: true,
  });

export default i18n;
