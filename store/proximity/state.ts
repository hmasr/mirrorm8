import { ProximityState } from "~/types";

const state = (): ProximityState => ({
  isSignalEnabled: false,
  socket: undefined
});

export default state;
