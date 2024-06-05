import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";

export function DatePicker({
  completionDate,
  setCompletionDate,
}: {
  completionDate: any;
  setCompletionDate: any;
}) {
  console.log(completionDate);
  const scheduleTasks = async () => {
    const getToken = await axios.get(`http://localhost:3000/api/get-token`);
    console.log(getToken);
    try {
      // const incompleteTasks = tasks.filter((task) => !task.isChecked);

      // const eventSummary = `Arc Reminder: ${incompleteTasks.length} tasks left`;
      // const eventDescription =
      //   `You have ${incompleteTasks.length} tasks left in Arc: \n` +
      //   incompleteTasks.map((task) => `- ${task}`).join("\n");

      const event = {
        summary: "car driving",
        description: "first task",
        start: {
          dateTime: "2024-06-23T09:00:00-07:00",
          timeZone: "America/Los_Angeles",
        },
        end: {
          dateTime: new Date(
            new Date("2024-06-23T09:00:00-07:00").getTime() + 30 * 60000
          ).toISOString(), // 30 minutes after start
          timeZone: "America/Los_Angeles",
        },
      };
      console.log(event);
      console.log(getToken.data.output[0].token);

      const response = await axios.post(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        event,

        {
          headers: {
            Authorization: `Bearer ${getToken.data.output[0].token}`,
            // "Content-Type": "application/json",
          },
          // body: JSON.stringify(event),
        }
      );

      console.log(response.data);
      // Handle success (e.g., updating state, showing a message)
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            " justify-start text-left font-normal w-full",
            !completionDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {completionDate ? (
            format(completionDate, "PPP")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={completionDate}
          onSelect={setCompletionDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
