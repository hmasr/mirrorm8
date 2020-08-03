import bodyParser from "body-parser";
import helmet from "helmet";
import express from "express";
import SocketIoNamespaces from "./io";
import SocketIO from "socket.io";
import consola from "consola";
import { Nuxt, Builder } from "nuxt";
import { createServer, Server } from "http";
import config from "../nuxt.config";
import routes from "./api";

const app = express();

async function start() {
  const server: Server = createServer(app);
  const io: SocketIO.Server = SocketIO(server);

  const port: string =
    process.env.NUXT_PORT ||
    process.env.PORT ||
    process.env.npm_package_config_nuxt_port ||
    "3000";
  const host: string =
    process.env.NUXT_HOST ||
    process.env.HOST ||
    process.env.npm_package_config_nuxt_host ||
    "localhost";
  const isProd: boolean = process.env.NODE_ENV === "production";
  config.dev = !isProd;

  // Load api routes
  app.use("/api", routes);

  // We instantiate Nuxt.js with the options
  const nuxt = new Nuxt(config);
  await nuxt.ready();

  // Start build process in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }
  // Load api middleware
  app.use(nuxt.render);
  app.use(bodyParser.json());
  app.use(helmet());

  server
    .listen(Number(port))
    .on("error", error => {
      consola.error(error);
    })
    .on("listening", () => {
      consola.ready("Server listening");
    });

  SocketIoNamespaces(io);
}

start();

module.exports = app;
