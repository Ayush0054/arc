"use client";
import ProgressModal from "@/components/arc/progress-modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Pen } from "lucide-react";
import { useEffect, useState } from "react";
import { currentUser } from "@clerk/nextjs";
import Cookies from "js-cookie";
import {
  checkTodo,
  deleteTodoByID,
  getArcById,
  unCheckTodo,
} from "../../../actions/action";

import { Badge } from "@/components/ui/badge";
import DuedateModal from "@/components/arc/duedate-modal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import EditGoal from "@/components/createGoal/edit-goal";
import NotesModal from "@/components/notes/notes-modal";
import CreateTaskModal from "@/components/arc/createTaskModal";

interface Params {
  params: { id: string };
}

function Page({ params }: Params) {
  const [showModal, setShowModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [userEmail, setUserEmail] = useState("ayush0054march@gmail.com");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [type, setType] = useState<string>();
  const [completionDate, setCompletionDate] = useState<Date>();
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState();
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
      if (response?.todo.length === 0) {
        setShowCreateTask(true);
      }
      setTitle(response?.title);
      setDescription(response?.description);
      setType(response?.type);
      setCompletionDate(response?.completiontime);
      //@ts-ignore
      setNotes(response?.Notes);
      //@ts-ignore
      console.log(response.todo);
      //@ts-ignore
      setTasks(response?.todo);
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };

  const user = currentUser;

  const Session = Cookies.get("__session");
  // const scheduleTasks = async () => {
  //   const getToken = await axios.get(`http://localhost:3000/api/get-token`);
  //   console.log(getToken);
  //   try {
  //     const event = {
  //       summary: "car driving",
  //       description: "first task",
  //       start: {
  //         dateTime: preferredTime,
  //         timeZone: "America/Los_Angeles",
  //       },
  //       end: {
  //         dateTime: new Date(
  //           new Date(preferredTime).getTime() + 30 * 60000
  //         ).toISOString(), // 30 minutes after start
  //         timeZone: "America/Los_Angeles",
  //       },
  //     };
  //     console.log(event);

  //     const response = await axios.post(
  //       "https://www.googleapis.com/calendar/v3/calendars/primary/events",
  //       event,

  //       {
  //         headers: {
  //           Authorization: `Bearer ${getToken.data.output[0].token}`,
  //           // "Content-Type": "application/json",
  //         },
  //         // body: JSON.stringify(event),
  //       }
  //     );

  //     console.log(response.data);
  //     // Handle success (e.g., updating state, showing a message)
  //   } catch (error) {
  //     console.error("There was an error!", error);
  //   }
  // };
  useEffect(() => {
    // scheduleTasks();
    getGoalDetails();
  }, []);
  //@ts-ignore
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
        //@ts-ignore
        if (task?.id === taskId) {
          // Ensure we're updating the task with the database's updatedTask information
          return updatedTask;
        }
        return task;
      });
      //@ts-ignore
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  console.log(new Date());

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
          key={
            //@ts-ignore
            task?.id
          }
          className="flex lg:items-center justify-between my-5 space-x-2 cursor-pointer"
        >
          <Checkbox
            id={`task-${
              //@ts-ignore
              task?.id
            }`} // Ensure this is unique
            checked={
              //@ts-ignore
              task?.isChecked
            }
            onCheckedChange={(e) =>
              handleCheckboxChange(
                //@ts-ignore
                task?.id,
                //@ts-ignore
                task?.isChecked
              )
            }
          />

          <label
            htmlFor={`task-${
              //@ts-ignore
              task?.id
            }`} // This must match the Checkbox id
            className={`text-lg font-medium font-nunito text-gray-600 leading-none ${
              //@ts-ignore
              task?.isChecked ? "line-through text-gray-400" : "text-gray-600"
            } peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
          >
            {
              //@ts-ignore
              task?.todo
            }
          </label>
          <div className=" lg:flex grid gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="secondary"
                  className={`hover:animate-hover-pop ${
                    //@ts-ignore
                    task?.isChecked ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={
                    //@ts-ignore
                    task?.isChecked
                  }
                >
                  Set Due date
                </Button>
              </PopoverTrigger>
              <PopoverContent side="top" className=" m-4 w-[300px]">
                <DuedateModal
                  task={
                    //@ts-ignore
                    task?.todo
                  }
                  date={date}
                  setDate={setDate}
                />
              </PopoverContent>
            </Popover>
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
      {showNotes && (
        <NotesModal
          setShowNotes={setShowNotes}
          arcid={params.id}
          notes={notes}
        />
      )}
      {showCreateTask && (
        <CreateTaskModal
          arcId={params.id}
          //@ts-ignore
          title={title}
          //@ts-ignore
          description={description}
          //@ts-ignore
          type={type}
          completionDate={completionDate}
          setShowCreateTask={setShowCreateTask}
        />
      )}
    </div>
  );
}

export default Page;
