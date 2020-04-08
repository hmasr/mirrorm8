import { Server } from "socket.io";
import Proximity from "./namespaces/proximity";

export default (io: Server) => {
  Proximity(io);
};
