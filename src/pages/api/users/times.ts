import { google } from "googleapis";
import { getGoogleOAuthToken } from "@/lib/google";
import { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";
import { getDate, getMonth } from "date-fns";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const calendar = google.calendar({
    version: "v3",
    auth: await getGoogleOAuthToken(),
  });

  const startHour = 480 / 60;
  const endHour = 1080 / 60;

  const possibleTimes = Array.from({ length: endHour - startHour }).map(
    (_, i) => {
      return startHour + i;
    }
  );

  const { data }: any = await calendar.events.list({
    calendarId: "primary",
  });

  const referenceDate = getDate(new Date("2022-09-08 10:00:00"));

  return res.json({ possibleTimes });
}
