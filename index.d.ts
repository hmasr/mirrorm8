import Vue from "vue";
import { INuxtSocketIo } from "~/types/nuxt-socket-io";
import * as vuex from "vuex";

declare module "*.vue" {
  const _default: Vue;
  export default _default;
}

declare module "vue/types/vue" {
  interface Vue {
    $nuxtSocket: INuxtSocketIo;
  }
}

declare module "vuex" {
  interface Store<S> {
    _vm: any;
  }
}
