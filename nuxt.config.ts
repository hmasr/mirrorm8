import { Configuration } from "@nuxt/types";

const config: Configuration = {
  server: {
    host: "0.0.0.0",
    port: 8000
  },
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
  plugins: [
    {
      src: "~/plugins/vue-gapi.client.ts",
      ssr: false
    }
  ],
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
  serverMiddleware: ["~/server"],
  io: {
    sockets: [
      {
        name: "proximity",
        url: "http://localhost:8000",
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
  axios: {
    baseURL: "http://localhost:8000"
  }
};

export default config;
