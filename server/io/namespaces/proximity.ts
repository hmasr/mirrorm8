import SocketIO from "socket.io";
// import { SignalProximity } from "node-pi-proximity";
// import { Gpio } from "onoff";
// import { execSync } from "child_process";
import consola from "consola";

export default (io: SocketIO.Server) => {
  const of = io.of("/proximity");
  // const gpio4 = new Gpio(4, "in", "both");

  of.on("connection", (socket: SocketIO.Socket) => {
    consola.info("Socket.IO connected to /proximity");

    socket.on("disconnect", () => {
      consola.info("client disconnected from /proximity");
    });
  });

  let state: boolean = false;
  setInterval(() => {
    state = !state;
    of.emit("change", state);
  }, 1000);

  // const signalProximity = new SignalProximity(
  //   gpio4,
  //   process.env.SIGNAL_TIMEOUT as number | undefined
  // );

  // signalProximity
  //   .on("begin", () => {
  //     console.log("Turn display ON");
  //     try {
  //       execSync("vcgencmd display_power 1");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })
  //   .on("change", () => {
  //     of.emit("change");
  //   })
  //   .on("end", () => {
  //     console.log("Turn display OFF");
  //     try {
  //       execSync("vcgencmd display_power 0");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   });

  // process.on("SIGINT", () => {
  //   signalProximity.stop();
  // });
};
