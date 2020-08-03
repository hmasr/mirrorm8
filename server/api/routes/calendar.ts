import { Router, Request, Response } from "express";
import { google } from "googleapis";

const router: Router = Router();

const jwtClient = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  undefined,
  process.env.GOOGLE_PRIVATE_KEY,
  "https://www.googleapis.com/auth/calendar.readonly"
);

const calendar = google.calendar({
  version: "v3",
  auth: jwtClient
});

router.get("/coming", async (req: Request, res: Response) => {
  try {
    const result = await calendar.events.list({
      calendarId: process.env.GAPI_CALENDAR_ID,
      timeMin: new Date().toISOString(),
      maxResults: 5,
      singleEvents: true,
      orderBy: "startTime"
    });
    if (result?.data?.items?.length) {
      res.json(result.data.items);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.json({ error });
  }
});

export default router;
