import { Configuration } from "nuxt";
import dotenv from "dotenv";
dotenv.config();

const config: Configuration = {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",

  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",

  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: "mirrorm8",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Smart Mirror project"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Nuxt option to set development mode.
   */
  dev: process.env.NODE_ENV !== "production",

  /*
   ** Global CSS
   */
  css: ["spectre.css", "~/assets/fonts/meteocons/meteocons.css"],

  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  watch: ["~/server/**/*.ts"],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // "@nuxtjs/eslint-module",
    "@nuxt/typescript-build"
  ],
  build: {
    extend(config: any, ctx: any) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? "source-map" : "inline-source-map";
      }
    }
  },

  /*
   ** Server Middleware
   */
  serverMiddleware: { "/api": "~/server/index.ts" },

  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/dotenv", "nuxt-socket-io"],

  /*
   ** Nuxt.js modules Options
   */
  io: {
    sockets: [
      {
        name: "proximity",
        default: true,
        transports: ["websocket"],
        vuex: {
          mutations: [{ change: "proximity/setIsSignalEnabled" }]
        },
        namespaces: {
          "/proximity": {}
        }
      }
    ]
  },
  axios: {}
};

export default config;
