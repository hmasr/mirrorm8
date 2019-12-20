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
    // commit("setEvents", eventsMock);
    try {
      if (
        !process.env.GAPI_CALENDAR_ID ||
        !process.env.GAPI_CALENDAR_ID.length
      ) {
        throw new Error("Undefined environment variable 'GAPI_CALENDAR_ID'");
      }
      const result: GapiEvents = await this._vm.$gapi.calendar.getEvents(
        process.env.GAPI_CALENDAR_ID
      );
      commit("setEvents", result);
    } catch (error) {
      console.log(error);
    }
  }
};

export default actions;
