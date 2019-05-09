import { RootState, GapiEventsState, GapiEvent } from "~/types";

import { GetterTree } from "vuex";

const getters: GetterTree<GapiEventsState, RootState> = {
  eventList(state: GapiEventsState): Array<GapiEvent> {
    return state.events;
  }
};

export default getters;
