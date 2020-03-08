export interface INuxtSocketIoOptions {
  name?: string;
  channel?: string;
  reconnection?: boolean;
  statusProp?: string;
}

export interface INuxtSocket {
  emit(name: string, body: Object, callback: Function);
}

export interface INuxtSocketIo {
  (options: INuxtSocketIoOptions): INuxtSocket;
}
