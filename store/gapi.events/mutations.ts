import { GapiEventsState, GapiEvent, GoogleEvent } from "~/types";
import { MutationTree } from "vuex";

const isToday = date => {
  const today = new Date();
  return date.toDateString() == today.toDateString();
};

const mutations: MutationTree<GapiEventsState> = {
  setEvents(state: GapiEventsState, payload: Array<GoogleEvent>) {
    const array: Array<GapiEvent> = [];
    console.log(payload);

    for (const ev of payload) {
      const date = new Date(ev.start.dateTime);
      const options: Intl.DateTimeFormatOptions = {
        weekday: isToday(date) ? undefined : "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      };
      array.push({
        id: ev.id,
        startDate: date,
        startDateStr: date.toLocaleDateString(process.env.LANG, options),
        location: ev.location,
        summary: ev.summary
      } as GapiEvent);
    }

    state.events = array;
  }
};

export default mutations;
