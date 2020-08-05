import bodyParser from "body-parser";
import helmet from "helmet";
import express from "express";
import SocketIoNamespaces from "./io";
import SocketIO from "socket.io";
import consola from "consola";
import { createServer, Server } from "http";

const app = express();

// Import Nuxt.js options
import { loadNuxt, build } from "nuxt";
import config from "../nuxt.config";

// Import Mirrorm8 Routes
import routes from "./api";

async function start() {
  consola.info("Starting mirrorm8 server...");
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

  // Instantiate and Build Nuxt.js
  const nuxt = await loadNuxt({ for: config.dev ? "dev" : "start" });
  build(nuxt);

  // Load api routes
  app.use("/api", routes);

  // Load middleware
  app.use(nuxt.render);
  app.use(bodyParser.json());
  app.use(helmet());

  server
    .listen(Number(port))
    .on("error", (error) => {
      consola.error(error);
    })
    .on("listening", () => {
      consola.ready("Mirrorm8 server READY");
    });

  SocketIoNamespaces(io);
}

if (require.main === module) {
  // The service must be called directly from the commandline
  // start() contains nuxt Loader and Builder.
  start();
} else {
  consola.error("Failed to load Mirrorm8 server");
}

module.exports = app;
