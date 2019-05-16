import { RootState } from "~/types";
import { GapiEventsState, GapiEvent } from "~/types/gapi.calendar";
import { GetterTree } from "vuex";

const getters: GetterTree<GapiEventsState, RootState> = {
  eventList(state: GapiEventsState): Array<GapiEvent> {
    return state.events;
  }
};

export default getters;
