export enum ButlerState {
  LISTENING,
  THINKING,
  ANSWERING
}

export type Intent = Array<string>;

export interface IButler {
  state: ButlerState;
  readonly modules: Array<IButlerModule>;
  add(module: IButlerModule);
  request(intent: Intent): Promise<void>;
}

export interface IButlerModule {
  readonly name: string;
}
export interface ICommand {
  request: string;
  callback(): Promise<void>;
}
