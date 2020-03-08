import dotenv from "dotenv";
import bodyParser from "body-parser";
import helmet from "helmet";
import express from "express";
import io from "./io";
import consola from "consola";
import { createServer, Server } from "http";

dotenv.config();

const port = 3000;
const host = "0.0.0.0";

const app = express();
const server: Server = createServer(app);

function listenAsync(): Promise<void> {
  return new Promise((resolve, reject) => {
    server
      .listen(port, host)
      .on("error", error => {
        consola.error(error);
        reject(error);
      })
      .on("listening", () => {
        consola.info("Server listening");
        resolve();
      });
  });
}

// Load api middleware
app.use(bodyParser.json());
app.use(helmet());

// Load api routes
import routes from "./api";
app.use("/api", routes);

// Load Socket.IO
(async () => {
  io(host, port, server);
  await listenAsync();
})();

// Export the server middleware
export default app;
