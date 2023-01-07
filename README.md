# i18next-gridly-backend

[![npm](https://img.shields.io/npm/v/i18next-gridly-backend.svg)](https://www.npmjs.com/package/i18next-gridly-backend)
![release](https://github.com/truongtrongtin/i18next-gridly-backend/workflows/Release/badge.svg)
[![bundlephobia](https://badgen.net/bundlephobia/minzip/i18next-gridly-backend)](https://bundlephobia.com/result?p=i18next-gridly-backend)

A simple i18next backend for [Gridly](https://www.gridly.com), a spreadsheet for multi-language content.

## Installation

```sh
npm install i18next i18next-gridly-backend
```

## Basic usage

IMPORTANT: make sure to use read-only apiKey in the production build to avoid misuse by strangers

```ts
import i18next from 'i18next';
import GridlyBackend, { GridlyBackendOptions } from 'i18next-gridly-backend';

const isProduction = process.env.NODE_ENV === 'production';
const backendOptions: GridlyBackendOptions = {
  apiKey: 'API_KEY', // Use read-only API key in production env for security reason
  viewId: 'VIEW_ID',
};

i18next
  .use(GridlyBackend)
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    lng: 'en',
    fallbackLng: 'en',
    backend: backendOptions,
    saveMissing: !isProduction,
  });
```

## React

**[See examples](https://github.com/truongtrongtin/i18next-gridly-backend/blob/main/examples/react-ts/src/i18n.ts)**

## Gridly Backend Options

```ts
{
    // Also used in production, please restrict this API key for your own risk
    apiKey: string;

    // View id
    viewId: string;

    // Namespace column id
    namespaceColumnId?: string;

    // Run after adding missing translation success
    onSaveSuccess?: (languages: readonly string[], namespace: string) => void;
}
```

## License

MIT
