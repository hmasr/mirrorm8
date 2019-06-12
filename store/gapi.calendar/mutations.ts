import { GapiEventsState, GapiEvent } from "~/types/gapi.calendar";
import { MutationTree } from "vuex";

const mutations: MutationTree<GapiEventsState> = {
  setEvents(
    state: GapiEventsState,
    payload: Array<gapi.client.calendar.Event>
  ) {
    console.log(payload);
    const array: Array<GapiEvent> = [];
    try {
      for (const ev of payload) {
        const startDate = ev.start!.dateTime || ev.start!.date;
        const endDate = ev.end!.dateTime || ev.end!.date;
        const start = new Date(startDate as string);
        const end = new Date(endDate as string);

        array.push({
          id: ev.id,
          date: {
            start,
            end
          },
          location: ev.location,
          summary: ev.summary
        } as GapiEvent);
      }
    } catch (error) {
      console.error(error);
    }

    state.events = array;
  }
};

export default mutations;
