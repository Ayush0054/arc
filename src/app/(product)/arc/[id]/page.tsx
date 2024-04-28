"use client";
import ProgressModal from "@/components/arc/progress-modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { Pen, Trash2 } from "lucide-react";
import { useEffect, useLayoutEffect, useState } from "react";
import { currentUser } from "@clerk/nextjs";
import Cookies from "js-cookie";
function Page() {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([
    { title: "Complete project documentation", isDone: false },
    { title: "Review code for module A", isDone: true },
    { title: "Prepare presentation slides", isDone: false },
  ]);
  const [userEmail, setUserEmail] = useState("ayush0054march@gmail.com");
  const [preferredTime, setPreferredTime] = useState(
    "2024-04-23T09:00:00-07:00"
  );
  const user = currentUser;

  const Session = Cookies.get("__session");
  const scheduleTasks = async () => {
    const getToken = await axios.get(`http://localhost:3000/api/get-token`);
    console.log(getToken);
    try {
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
        };

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
      }
      // else {
      //   // Handle case where there are no incomplete tasks
      //   console.log("No incomplete tasks to create an event for.");
      // }
    } catch (error) {
      console.error("There was an error!", error.response);
    }
  };
  // useLayoutEffect(() => {
  //   scheduleTasks();
  // }, []);

  return (
    <div className=" flex flex-col justify-center container   mt-6">
      <div className=" flex items-center gap-3">
        30%
        <Progress value={30} className=" my-4" />
      </div>
      <div>
        <h1 className=" text-3xl font-semibold text-start ">learn Rust</h1>

        <h2 className=" text-xl font-medium text-start mt-6">
          {" "}
          making trading system with rust
        </h2>
      </div>
      <div className=" my-4 flex items-center gap-2">
        <h1></h1>
        <Input
          type="text"
          placeholder="Add new task"
          // value={newTask}
          // onChange={handleNewTaskChange}
        />
        <Button
        // onClick={addNewTask}
        >
          Add Task
        </Button>
        <Button variant="outline">add Notes</Button>
        <Button variant="outline">add Reminders</Button>
      </div>
      <div className="flex items-center justify-between my-5 space-x-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
        <div className=" flex gap-2 items-center">
          <Button variant="outline">Add progress</Button>
          <Pen />
          <Trash2 />
        </div>
      </div>
      <div className="flex items-center justify-between my-5 space-x-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm line-through text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
        <div className=" flex gap-2 items-center">
          <Button variant="outline">Add progress</Button>
          <Pen />
          <Trash2 />
        </div>
      </div>
      <div className="flex items-center justify-between my-5 space-x-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
        <div className=" flex gap-2 items-center">
          <Button variant="outline">Add progress</Button>
          <Pen />
          <Trash2 />
        </div>
      </div>
      <div className="flex items-center justify-between my-5 space-x-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
        <div className=" flex gap-2 items-center">
          <Button variant="outline">Add progress</Button>
          <Pen />
          <Trash2 />
        </div>
      </div>
      <div className=" flex gap-6">
        <Button>Updates</Button>
        <Button variant="secondary">Save changes</Button>
      </div>
      {showModal && <ProgressModal />}
    </div>
  );
}

export default Page;
