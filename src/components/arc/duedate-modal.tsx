import React, { useState } from "react";
import { DatePicker } from "../createGoal/datepicker";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { X } from "lucide-react";

function DuedateModal({ setShowCalendar }) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div>
      <div className="  ">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className=""
        />
      </div>
      <div className=" flex justify-between mt-4 ">
        <Button variant="outline">Set Google Reminder</Button>
        <Button>set</Button>
      </div>
    </div>
  );
}

export default DuedateModal;
