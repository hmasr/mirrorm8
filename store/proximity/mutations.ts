import { ProximityState } from "~/types";
import { MutationTree } from "vuex";

const mutations: MutationTree<ProximityState> = {
  setIsSignalEnabled(state: ProximityState, flag: boolean) {
    state.isSignalEnabled = flag;
    console.log(`Set Proximity isSignalEnabled=${state.isSignalEnabled}`);
  }
};

export default mutations;
