import { GapiEvents, IGapiCalendar } from "~/types/gapi.calendar";

export default class GapiCalendar implements IGapiCalendar {
  static readonly ModuleName: string = "calendar.v3";

  public async getEvents(calendarId: string): Promise<GapiEvents> {
    try {
      const options = {
        singleEvents: true,
        orderBy: "startTime",
        calendarId: calendarId,
        timeMin: new Date().toISOString(),
        maxResults: 5
      };
      const { result } = await gapi.client.calendar.events.list(options);
      if (result.error) {
        throw new Error(result.error);
      }

      return result.items as GapiEvents;
    } catch (error) {
      throw error;
    }
  }
}
