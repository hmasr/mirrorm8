import _Vue, { PluginObject } from "vue";
import Gapi, { GapiOptions } from "./gapi-module.client";

export interface IVueGapiModule {
  readonly scope: string[];
  readonly name: string;
}

export interface VueGapiOptions {
  modules: Array<IVueGapiModule>;
}

export class VueGapiModule implements PluginObject<VueGapiOptions> {
  [key: string]: any;
  install(Vue: typeof _Vue, options?: VueGapiOptions): void {
    if (!options) {
      throw new Error("VueGapiModule: undefined property options");
    }

    Vue.prototype.$gapi = new Gapi(options as GapiOptions);
  }
}
