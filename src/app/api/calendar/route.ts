import { NextResponse } from "next/server";

import { auth, currentUser } from "@clerk/nextjs";
import axios from "axios";
import { cookies } from "next/headers";
export async function POST(req: Request, res: NextResponse) {
  try {
    const cookieStore = cookies();
    const Session = cookieStore.get("__session");
    // console.log(Session);

    const body = await req.json();
    const user = await currentUser();
    // console.log(user);

    //   console.log(body);

    const { tasks, preferredTime, token } = body;
    const incompleteTasks = tasks.filter((task) => !task.isDone);

    if (incompleteTasks.length > 0) {
      const eventSummary = `Arc Reminder: ${incompleteTasks.length} tasks left`;
      const eventDescription =
        `You have ${incompleteTasks.length} tasks left in Arc: \n` +
        incompleteTasks.map((task) => `- ${task.title}`).join("\n");

      const event = {
        summary: eventSummary,
        description: eventDescription,
        start: {
          dateTime: preferredTime,
          timeZone: "America/Los_Angeles",
        },
        end: {
          dateTime: new Date(
            new Date(preferredTime).getTime() + 30 * 60000
          ).toISOString(), // 30 minutes after start
          timeZone: "America/Los_Angeles",
        },
        // recurrence: [
        //   "RRULE:FREQ=DAILY;UNTIL=20241231T235959Z", // Recur daily until end of 2024
        // ],
        // attendees: [
        //   { email: user?.emailAddresses[0]._EmailAddress?.emailAddress },
        // ],
        // reminders: {
        //   useDefault: false,
        //   overrides: [
        //     { method: "email", minutes: 24 * 60 },
        //     { method: "popup", minutes: 10 },
        //   ],
        // },
      };

      const response = await axios.post(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          headers: {
            Authorization: `Bearer ya29.a0Ad52N3_BuOm7fWDhIsrxxeKhZRPiAAFZPDjZbMntIQ9ecpSXaIIr0PqTi95qiVnupIyV3UIw1glM_68_cSiWRV5iN1pjsD1-tjUyRq3kBcQs0rqs3FT85j1PhsW5LFCe73SAXInFDvxqcDiWkJR9wVBrdeOLP76Hcjg3aCgYKAZUSARASFQHGX2MiHQCwqTZrZbFqMfdQuRfeJw0171`,
          },
          body: JSON.stringify(event),
        }
      );
      console.log(response.data);

      return NextResponse.json(
        { output: response.data },
        {
          status: 200,
        }
      );
    } else {
      // Handle case where there are no incomplete tasks
      NextResponse.json(
        {
          message: "No incomplete tasks to create an event for.",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    NextResponse.json(
      { output: error },
      {
        status: 200,
      }
    );
  }
}
