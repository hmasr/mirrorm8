import { GapiEventsState, GapiEvents } from "~/types/gapi.calendar";
import { RootState } from "~/types";
import { ActionTree } from "vuex";

const eventsMock = [
  {
    id: 1,
    summary: "Party",
    start: {
      dateTime: new Date()
    },
    end: {
      dateTime: new Date()
    },
    location: "Dynamo"
  },
  {
    id: 2,
    summary: "Repetitie",
    start: {
      dateTime: new Date()
    },
    end: {
      dateTime: new Date()
    },
    location: "Muziekschool"
  }
];

const actions: ActionTree<GapiEventsState, RootState> = {
  async getEvents({ commit }) {
    try {
      const result: GapiEvents = await this.$axios.$get("/api/calendar/coming");
      commit("setEvents", result);
    } catch (error) {
      console.log(error);
    }
  }
};

export default actions;
