import _Vue, { PluginObject } from "vue";
import GapiCalendar from "./gapi.calendar.client";

export class VueGapiCalendar implements PluginObject<any> {
  [key: string]: any;
  install(Vue: typeof _Vue, options?: any): void {
    if (!Vue.prototype.$gapi) {
      throw new Error("VueGapiCalendar: undefined vue-gapi-module!");
    }

    Vue.prototype.$gapi.calendar = new GapiCalendar();
  }
}
