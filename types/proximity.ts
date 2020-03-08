import { INuxtSocket } from "~/types/nuxt-socket-io";

export interface ProximityState {
  isSignalEnabled: boolean;
  socket: INuxtSocket | undefined;
}
