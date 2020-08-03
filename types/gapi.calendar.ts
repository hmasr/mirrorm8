export type GapiEvents = gapi.client.calendar.Event[] | undefined;

export interface GapiEventsState {
  events: Array<GapiEvent>;
}

export interface GapiEvent {
  id: string;
  date: {
    start: Date;
    end: Date;
  };
  summary: string;
  location: string;
}

export interface GoogleEvent {
  id: string;
  location: string;
  summary: string;
  start: {
    dateTime: string;
  };
}

export interface IGapiCalendar {
  getEvents(calendarId: string): Promise<GapiEvents>;
}
