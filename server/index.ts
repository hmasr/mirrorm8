import dotenv from "dotenv";
import bodyParser from "body-parser";
import helmet from "helmet";
import express from "express";
import SocketIoNamespaces from "./io";
import SocketIO from "socket.io";
import consola from "consola";
import { Nuxt, Builder } from "nuxt";
import { createServer, Server } from "http";
import config from "../nuxt.config";

dotenv.config();

const app = express();
const server: Server = createServer(app);
const io: SocketIO.Server = SocketIO(server);

const port = process.env.PORT || 8000;
const isProd: boolean = process.env.NODE_ENV === "production";
config.dev = !isProd;

// Load api routes
import routes from "./api";
app.use("/api", routes);

// We instantiate Nuxt.js with the options
(async () => {
  const nuxt = new Nuxt(config);
  await nuxt.ready();

  // Start build process in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    builder.build();
  }

  // Load api middleware
  app.use(nuxt.render);
  app.use(bodyParser.json());
  app.use(helmet());

  server
    .listen(port)
    .on("error", error => {
      consola.error(error);
    })
    .on("listening", () => {
      consola.info("Server listening");
    });

  SocketIoNamespaces(io);
})();
