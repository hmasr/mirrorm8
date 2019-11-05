import Vue from "vue";
import { IGapi } from "~/types/gapi-module";
import * as vuex from "vuex";

declare module "*.vue" {
  const _default: Vue;
  export default _default;
}

declare module "vue/types/vue" {
  interface Vue {
    $gapi: IGapi;
  }
}

declare module "vuex" {
  interface Store<S> {
    _vm: any;
  }
}
