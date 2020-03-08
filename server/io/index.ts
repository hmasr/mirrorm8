import SocketIO from "socket.io";
import { Server } from "http";
import consola from "consola";

export default (host: string, port: number, server: Server) => {
  const io: SocketIO.Server = SocketIO(server);

  console.log("starting ws on " + host + ":" + port, server.listening);
  const namespace = io.of("/proximity");
  namespace.on("connection", (socket: SocketIO.Socket) => {
    consola.info("Socket.IO connected to /proximity");
    socket.on("proximity", (message: string, cb: Function) => {
      consola.info(message);
      socket.emit("proximity", { test: true });

      cb();
    });

    socket.on("disconnect", () => {
      consola.info("client disconnected from /proximity");
    });
  });
};
