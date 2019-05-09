import { get } from "~/plugins/gapi.client";
import { RootState, GapiEventsState, GoogleEvent } from "~/types";
import { ActionTree } from "vuex";

const actions: ActionTree<GapiEventsState, RootState> = {
  async getEvents({ commit }) {
    const result = await get();

    commit("setEvents", result as Array<GoogleEvent>);
  }
};

export default actions;
