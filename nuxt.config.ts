import { Configuration } from "nuxt";
import dotenv from "dotenv";
dotenv.config();

const config: Configuration = {
  mode: "universal",
  dev: process.env.NODE_ENV !== "production",
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
  loading: { color: "#3B8070" },
  plugins: [],
  css: ["spectre.css", "~/assets/fonts/meteocons/meteocons.css"],
  watch: ["~/server/**/*.ts"],
  buildModules: ["@nuxt/typescript-build"],
  build: {
    extend(config: any, ctx: any) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? "source-map" : "inline-source-map";
      }
    }
  },
  modules: ["@nuxtjs/axios", "@nuxtjs/dotenv", "nuxt-socket-io"],
  serverMiddleware: [{ path: "/api", handler: "~/server/index.ts" }],
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
