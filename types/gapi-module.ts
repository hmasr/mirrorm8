export type GapiScope = string[];

export interface IGapiModule {
  [key: string]: any;
  readonly scope: string[];
  readonly name: string;
}

export interface IGapi {
  initialize(): Promise<void>;
  authenticate(): Promise<gapi.auth2.GoogleAuth>;
}
