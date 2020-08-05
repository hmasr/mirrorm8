import express from "express";
import SocketIoNamespaces from "./io";
import SocketIO from "socket.io";
import consola from "consola";
import { createServer, Server } from "http";

const app = express();

// Import Nuxt.js options\
import dotenv from "dotenv";
dotenv.config();

// Import Mirrorm8 Routes
import router from "./api";

consola.info("Starting mirrorm8 server...");
const server: Server = createServer(app);
const io: SocketIO.Server = SocketIO(server);

SocketIoNamespaces(io);

export default {
  path: "/api",
  handler: router,
};
