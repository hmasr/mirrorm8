import NuxtConfiguration from "@nuxt/config";

const config: NuxtConfiguration = {
  env: {
    KEY_OPENWEATHERMAPAPI: process.env.KEY_OPENWEATHERMAPAPI as string
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
  css: ["spectre.css", "~/assets/fonts/meteocons/meteocons.css"],
  build: {},
  modules: ["@nuxtjs/axios", "@nuxtjs/dotenv"],
  axios: {}
};

export default config;
