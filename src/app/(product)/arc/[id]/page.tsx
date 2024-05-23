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
import { ScrollArea } from "@/components/ui/scroll-area";
import DeleteDialog from "@/components/arc/delete-dialog";
import { deleteArcById } from "@/app/actions/arc/action";
import { useRouter } from "next/navigation";

interface Params {
  params: { id: string };
}

function Page({ params }: Params) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [type, setType] = useState<string>();
  const [completionDate, setCompletionDate] = useState<Date>();
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState();
  const handleEditModal = async () => {
    setShowEditModal(true);
  };
  const handleNotesModal = () => {
    setShowNotes(true);
  };

  const getGoalDetails = async () => {
    try {
      const response = await getArcById(params.id);

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
      setTasks(response?.todo);
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };

  const user = currentUser;

  // const Session = Cookies.get("__session");

  useEffect(() => {
    getGoalDetails();
  }, []);
  //@ts-ignore
  const handleCheckboxChange = async (taskId, isChecked) => {
    try {
      const updateFunction = isChecked ? unCheckTodo : checkTodo;

      const updatedTask = await updateFunction(taskId);

      const updatedTasks = tasks.map((task) => {
        //@ts-ignore
        if (task?.id === taskId) {
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

  const handleDeleteArc = async () => {
    const res = await deleteArcById(params.id);

    router.push("/home");
  };
  //date formating
  function formatDate(dateString: any) {
    if (!dateString) {
      return "Invalid date";
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    const formatter = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return formatter.format(date);
  }
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
        <Badge
          variant="secondary"
          className=" my-2 rounded-[7px] bg-blue-100 hover:bg-blue-100 border-blue-400 border-2"
        >
          {formatDate(completionDate)}
        </Badge>
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
            <DeleteDialog handleDelete={handleDeleteArc} />
          </div>
        </div>
      </div>
      <div className=" my-4 flex items-center gap-2">
        <h1></h1>
      </div>
      <ScrollArea className="h-[600px]  rounded-md border p-4">
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
      </ScrollArea>

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
          // notes={notes}
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
