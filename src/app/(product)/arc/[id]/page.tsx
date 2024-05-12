"use client";
import ProgressModal from "@/components/arc/progress-modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { Pen, Stars, Trash2 } from "lucide-react";
import { useEffect, useLayoutEffect, useState } from "react";
import { currentUser } from "@clerk/nextjs";
import Cookies from "js-cookie";
import {
  checkTodo,
  deleteTodoByID,
  getArcById,
  unCheckTodo,
} from "../../../actions/action";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import DuedateModal from "@/components/arc/duedate-modal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import EditGoal from "@/components/createGoal/edit-goal";
import NotesModal from "@/components/notes/notes-modal";

interface Params {
  params: { id: string };
}

function Page({ params }: Params) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [userEmail, setUserEmail] = useState("ayush0054march@gmail.com");
  const [preferredTime, setPreferredTime] = useState(
    "2024-04-23T09:00:00-07:00"
  );
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [type, setType] = useState<string>();
  const [completionDate, setCompletionDate] = useState<Date>();
  const [tasks, setTasks] = useState([]);
  const [checked, setChecked] = useState(false);
  const handleEditModal = async () => {
    setShowEditModal(true);
  };
  const handleNotesModal = () => {
    setShowNotes(true);
  };
  const handlProgressModal = async () => {
    setShowModal(true);
  };
  console.log(showNotes);

  const getGoalDetails = async () => {
    try {
      const response = await getArcById(params.id);

      console.log(response);
      // if (!response?.todo) {
      //   router.push(`/createarc/todo/${params.id}`);
      //   return;
      // }
      setTitle(response?.title);
      setDescription(response?.description);
      setType(response?.type);
      setCompletionDate(response?.completiontime);
      console.log(response.todo);

      setTasks(response?.todo);
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };

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
    } catch (error) {
      console.error("There was an error!", error.response);
    }
  };
  useLayoutEffect(() => {
    // scheduleTasks();
    getGoalDetails();
  }, []);
  const handleCheckboxChange = async (taskId, isChecked) => {
    try {
      // Determine the appropriate function to call based on isChecked
      console.log(isChecked);

      const updateFunction = isChecked ? unCheckTodo : checkTodo;

      // Make an API call to update the database
      const updatedTask = await updateFunction(taskId);
      console.log(updatedTask);

      // Update UI elements based on the successful database update
      const updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
          // Ensure we're updating the task with the database's updatedTask information
          return updatedTask;
        }
        return task;
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  return (
    <div className=" flex flex-col justify-center container   mt-6">
      <div>
        <h1 className=" text-3xl font-semibold text-start capitalize  ">
          {title}
        </h1>
        {/* <Input className=" border-none focus-visible:ring-0" /> */}
        <h2 className=" text-xl  font-medium text-start mt-6 mb-6 text-gray-700">
          {" "}
          {description}
        </h2>
        <div className=" flex justify-between">
          <div>
            <Badge variant="secondary">{type}</Badge>
          </div>
          <div className=" flex gap-3">
            <button onClick={handleEditModal}>
              <Pen />
            </button>
            <Button onClick={handleNotesModal} className="">
              Add Notes
            </Button>
          </div>
        </div>
      </div>
      <div className=" my-4 flex items-center gap-2">
        <h1></h1>
      </div>

      {tasks?.map((task) => (
        <div
          key={task?.id}
          className="flex lg:items-center justify-between my-5 space-x-2 cursor-pointer"
        >
          <Checkbox
            id={`task-${task?.id}`} // Ensure this is unique
            checked={task?.isChecked}
            onCheckedChange={(e) =>
              handleCheckboxChange(task?.id, task?.isChecked)
            }
          />

          <label
            htmlFor={`task-${task?.id}`} // This must match the Checkbox id
            className={`text-lg font-medium font-nunito text-gray-600 leading-none ${
              task?.isChecked ? "line-through text-gray-400" : "text-gray-600"
            } peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
          >
            {task?.todo}
          </label>
          <div className=" lg:flex grid gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="secondary"
                  className={`hover:animate-hover-pop ${
                    task?.isChecked ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={task?.isChecked}
                >
                  Set Due date
                </Button>
              </PopoverTrigger>
              <PopoverContent side="left" className=" m-4 w-[300px]">
                <DuedateModal setShowCalendar={setShowCalendar} />
              </PopoverContent>
            </Popover>
            <Button variant="outline" disabled={task?.isChecked}>
              Add progress
            </Button>
          </div>
        </div>
      ))}

      <div className=" mt-8 flex justify-end">
        <Button disabled>Save</Button>
      </div>
      {showModal && <ProgressModal />}
      {showEditModal && (
        <EditGoal
          getGoalDetail={getGoalDetails}
          arcId={params.id}
          name={title}
          description={description}
          type={type}
          completionDate={completionDate}
          setShowEditModal={setShowEditModal}
        />
      )}
      {showNotes && <NotesModal setShowNotes={setShowNotes} />}
    </div>
  );
}

export default Page;
