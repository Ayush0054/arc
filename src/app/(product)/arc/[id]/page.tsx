"use client";
import ProgressModal from "@/components/arc/progress-modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Pen } from "lucide-react";
import { useEffect, useState } from "react";
import { currentUser } from "@clerk/nextjs";

import { checkTodo, getArcById, unCheckTodo } from "../../../actions/action";

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

import DeleteDialog from "@/components/arc/delete-dialog";
import { ArcCheckIsDone, deleteArcById } from "@/app/actions/arc/action";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

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

  const [isCompleted, setIsCompleted] = useState<Boolean>();
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
      // setNotes(response?.Notes);

      //@ts-ignore
      setTasks(response?.todo);
      setIsCompleted(response?.isCompleted);
      // console.log(response);
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };

  // const user = currentUser;

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
      // console.log(updatedTask);

      toast(
        `task is ${updatedTask?.isChecked === true ? "checked" : "unchecked"}`
      );
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
  const handleArcCompleted = async () => {
    const newIsCompleted = !isCompleted;
    setIsCompleted(newIsCompleted);

    // Use newIsCompleted for the API call to ensure you're using the updated state
    await ArcCheckIsDone(params.id, newIsCompleted);
  };
  return (
    <div className=" flex flex-col justify-center lg:container    mt-6">
      <div>
        <div className=" flex justify-between items-center  ">
          <h1 className=" text-3xl font-semibold text-start capitalize text-white  ">
            {title}
          </h1>
          <div className="lg:flex hidden items-center space-x-2">
            <Label htmlFor="isDone" className=" text-white">
              Mark it as Done
            </Label>
            <Switch
              id="isDone"
              className="  data-[state=unchecked]:bg-red-600"
              checked={isCompleted as boolean}
              onCheckedChange={handleArcCompleted}
            />
          </div>
        </div>
        {/* <Input className=" border-none focus-visible:ring-0" /> */}
        <h2 className=" text-xl  font-medium text-start mt-6 mb-6 text-gray-500">
          {" "}
          {description}
        </h2>
        <Badge
          variant="secondary"
          className=" my-2 rounded-[7px] bg-blue-100 hover:bg-blue-100 border-blue-400 border-2"
        >
          {formatDate(completionDate)}
        </Badge>
        <div className=" lg:flex justify-between">
          <div>
            <Badge variant="secondary">{type}</Badge>
          </div>
          <div className=" lg:flex grid gap-3 max-lg:mt-4">
            <button className=" lg:block hidden" onClick={handleEditModal}>
              <Pen color="white" />
            </button>
            <div className="flex lg:hidden items-center space-x-2">
              <Switch
                id="isDone"
                checked={isCompleted as boolean}
                onCheckedChange={handleArcCompleted}
              />
              <Label htmlFor="isDone">Mark it as Done</Label>
            </div>
            <Button className=" lg:hidden " onClick={handleEditModal}>
              Edit Tasks
            </Button>
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
      <div className="h-[600px] overflow-scroll   py-4">
        {tasks?.map((task) => (
          <div
            key={
              //@ts-ignore
              task?.id
            }
            className="flex items-center justify-between my-5 space-x-2 cursor-pointer"
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
              className="  bg-[#1B1717]/90  data-[state=checked]:bg-[#1B1717]/90 border-none px-1 w-6 h-6 "
            />

            <label
              htmlFor={`task-${
                //@ts-ignore
                task?.id
              }`} // This must match the Checkbox id
              className={` lg:text-lg text-sm  font-medium font-nunito text-gray-50 leading-none ${
                //@ts-ignore
                task?.isChecked ? "line-through text-gray-600" : "text-gray-500"
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
                    className={`hover:animate-hover-pop text-[12px] ${
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
                <PopoverContent
                  side="top"
                  className=" m-4 w-[300px] bg-[#111316]"
                >
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
      </div>

      {/* <div className=" mt-8 flex justify-end">
        <Button disabled>Save</Button>
      </div> */}
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
