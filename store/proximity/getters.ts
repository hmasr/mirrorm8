import { ProximityState, RootState } from "~/types";
import { GetterTree } from "vuex";

const getters: GetterTree<ProximityState, RootState> = {
  isSignalEnabled(state: ProximityState): boolean {
    return state.isSignalEnabled;
  }
};

export default getters;
