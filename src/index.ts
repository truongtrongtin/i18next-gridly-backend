import { BackendModule, InitOptions, ResourceKey, Services } from 'i18next';

export type GridlyBackendOptions = {
  apiKey: string;
  viewId: string;
  namespaceColumnId?: string;
  onSaveSuccess?: (languages: readonly string[], namespace: string) => void;
};

export type Cell = {
  columnId: string;
  value?: string | number | null;
};

export type Record = {
  id: string;
  cells: Cell[];
  path?: string;
};

export default class GridlyBackend
  implements BackendModule<GridlyBackendOptions>
{
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

  type = GridlyBackend.type;
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
    const { apiKey, viewId, namespaceColumnId } = this.backendOptions;

    const MAX_LIMIT = 1000;
    let offset = 0,
      totalCount = 0,
      records: Record[] = [];

    do {
      const query = new URLSearchParams({
        page: JSON.stringify({ limit: MAX_LIMIT, offset }),
        columnIds: language,
        query: JSON.stringify({
          ...(namespaceColumnId
            ? { [namespaceColumnId]: { '=': namespace } }
            : {}),
        }),
      });
      const response = await fetch(
        `https://api.gridly.com/v1/views/${viewId}/records?${query}`,
        { headers: { Authorization: `ApiKey ${apiKey}` } },
      );
      const newRecords = await response.json();
      if (!response.ok) {
        throw newRecords;
      }
      records = records.concat(newRecords);
      totalCount = Number(response.headers.get('x-total-count'));
      offset += MAX_LIMIT;
    } while (offset < totalCount);

    const result: ResourceKey = {};
    for (const record of records) {
      const recordId = record.id;
      const value = record.cells[0]?.value;
      result[recordId] = value;
    }
    return result;
  }

  async create(
    languages: readonly string[],
    namespace: string,
    key: string,
    fallbackValue: string,
  ) {
    const { apiKey, viewId, namespaceColumnId, onSaveSuccess } =
      this.backendOptions;
    const cells: Cell[] = languages.map((language) => ({
      columnId: language,
      value: fallbackValue,
    }));

    if (namespaceColumnId) {
      const namespaceCell: Cell = {
        columnId: namespaceColumnId,
        value: namespace,
      };
      cells.push(namespaceCell);
    }
    const records: Record[] = [{ id: key, cells }];
    const response = await fetch(
      `https://api.gridly.com/v1/views/${viewId}/records`,
      {
        method: 'POST',
        headers: {
          Authorization: `ApiKey ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(records),
      },
    );
    const json = await response.json();
    if (!response.ok) throw json;
    onSaveSuccess && onSaveSuccess(languages, namespace);
  }
}
