import { randomUUID } from "crypto";
import { google } from "googleapis";

import { getGoogleOAuthToken } from "@/lib/google";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const calendar = google.calendar({
      version: "v3",
      auth: await getGoogleOAuthToken(),
    });

    const startDateTime = new Date("2023-05-04 08:00:00").toISOString();
    const endDateTime = new Date("2023-05-04 09:00:00").toISOString();

    await calendar.events.insert({
      calendarId: "primary",
      conferenceDataVersion: 1,
      requestBody: {
        summary: "Discovery Google Calendar: Resolv",
        description: "Observações do evento",
        start: {
          dateTime: startDateTime,
        },
        end: {
          dateTime: endDateTime,
        },
        attendees: [
          {
            email: "rafael@resolv.ai",
            displayName: "Rafael Pereira",
          },
        ],
        conferenceData: {
          createRequest: {
            requestId: randomUUID(),
            conferenceSolutionKey: {
              type: "hangoutsMeet",
            },
          },
        },
      },
    });

    res.status(201).send({
      message: "✅ Evento criado com sucesso",
    });
  }
}
