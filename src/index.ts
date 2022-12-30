import { BackendModule, InitOptions, Services } from 'i18next';

export interface GridlyBackendOptions {
  apiKey: string;
  viewId: string;
}

export class Backend implements BackendModule<GridlyBackendOptions> {
  static type = 'backend' as const;

  constructor(
    services: Services,
    backendOptions: GridlyBackendOptions,
    i18nextOptions: InitOptions,
  ) {
    this.services = services;
    this.backendOptions = backendOptions;
    this.i18nextOptions = i18nextOptions;
  }

  type = Backend.type;
  services: Services;
  backendOptions: GridlyBackendOptions;
  i18nextOptions: InitOptions;

  init(
    services: Services,
    backendOptions: GridlyBackendOptions,
    i18nextOptions: InitOptions,
  ) {
    this.services = services;
    this.backendOptions = backendOptions;
    this.i18nextOptions = i18nextOptions;
  }

  async read(language: string, namespace: string) {
    console.log(language);
    console.log(namespace);
    const { apiKey, viewId } = this.backendOptions;
    const records = await fetch(
      `https://api.gridly.com/v1/views/${viewId}/records`,
      { headers: { Authorization: `ApiKey ${apiKey}` } },
    );
    const json = await records.json();
    console.log(json);
  }

  create() {
    console.log('create');
  }
  save() {
    console.log('SAVEEEE');
  }
}
