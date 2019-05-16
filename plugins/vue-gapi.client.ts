import Vue from "vue";
import { VueGapiModule, VueGapiOptions } from "./vue-gapi-module";
import { VueGapiCalendar } from "./vue-gapi.calendar";
import GapiCalendar from "./gapi.calendar.client";

const vueGapiModule = new VueGapiModule();
const vueGapiCalendar = new VueGapiCalendar();

Vue.use(vueGapiModule, {
  modules: [
    {
      name: GapiCalendar.ModuleName,
      scope: ["https://www.googleapis.com/auth/calendar.events.readonly"]
    }
  ]
} as VueGapiOptions);
Vue.use(vueGapiCalendar);
