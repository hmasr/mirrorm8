import SocketIO from "socket.io";
import { SignalProximity } from "node-pi-proximity";
import { Gpio } from "onoff";
import { execSync } from "child_process";
import consola from "consola";

export default (io: SocketIO.Server) => {
  consola.info("Loading socket.io namespaces...");
  const of = io.of("/proximity");

  of.on("connection", (socket: SocketIO.Socket) => {
    consola.info("Socket.IO connected to /proximity");

    socket.on("disconnect", () => {
      consola.info("client disconnected from /proximity");
    });
  });

  if (!Gpio.accessible) {
    let state: boolean = false;
    setInterval(() => {
      state = !state;
      of.emit("change", state);
    }, 1000);
  } else {
    const gpio4 = new Gpio(4, "in", "both");
    const timeout = process.env.SIGNAL_TIMEOUT || 60;
    const timeoutMs = timeout * 1000;

    const signalProximity = new SignalProximity(gpio4, timeoutMs);

    signalProximity
      .on("begin", () => {
        consola.log("Turn display ON");
        try {
          execSync("vcgencmd display_power 1");
        } catch (error) {
          consola.error(error);
        }
      })
      .on("change", value => {
        of.emit("change", Boolean(value));
      })
      .on("end", () => {
        consola.log("Turn display OFF");
        try {
          execSync("vcgencmd display_power 0");
        } catch (error) {
          consola.error(error);
        }
      });

    process.on("SIGINT", () => {
      signalProximity.stop();
    });
  }
};
