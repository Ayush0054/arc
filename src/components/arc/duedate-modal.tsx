import React from "react";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";

import axios from "axios";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

import { TimePickerDemo } from "./time-picker-demo";
function DuedateModal({
  task,
  date,
  setDate,
}: {
  task: any;
  date: any;
  setDate: any;
}) {
  // const [date, setDate] = React.useState<Date | undefined>(new Date());
  console.log(date);
  console.log(task);
  const scheduleTasks = async () => {
    const getToken = await axios.get(`http://localhost:3000/api/get-token`);
    console.log(getToken);

    try {
      const event = {
        summary: task,
        // description: "first task",
        start: {
          dateTime: date,
          time: "5:00",
          // timeZone: "America/Los_Angeles",
        },
        end: {
          dateTime: new Date(
            new Date(date).getTime() + 30 * 60000
          ).toISOString(), // 30 minutes after start
          // timeZone: "America/Los_Angeles",
        },
      };
      console.log(event);

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
    <div>
      {/* <div className="  ">
        <TimePicker onChange={onChange} value={value} />
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className=""
        />
      </div>
      <div className=" flex justify-between mt-4 ">
        <Button onClick={scheduleTasks} variant="outline">
          Set Google Reminder
        </Button>
        <Button>set</Button>
      </div> */}

      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      <div className="p-3 border-t border-border">
        <TimePickerDemo setDate={setDate} date={date} />
      </div>
      <div className=" flex justify-between mt-4 w-full ">
        <Button onClick={scheduleTasks} className=" w-full" variant="outline">
          Set Google Reminder
        </Button>
        {/* <Button>set</Button> */}
      </div>
    </div>
  );
}

export default DuedateModal;
