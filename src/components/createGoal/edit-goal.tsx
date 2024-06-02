import {
  AddSingleTodo,
  deleteTodoByID,
  getArcById,
  // updateTodo,
} from "@/app/actions/action";
import React, { useLayoutEffect, useState } from "react";
import { Button } from "../ui/button";
import { Trash2, X } from "lucide-react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function EditGoal({
  getGoalDetail,
  setShowEditModal,
  arcId,
  name,
  description,
  type,
  completionDate,
}: {
  // onClose: () => void;
  getGoalDetail: any;
  setShowEditModal: any;
  arcId: any;
  name: any;
  description: any;
  type: any;
  completionDate: any;
}) {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  // const [editIndex, setEditIndex] = useState(null);
  // const [editValue, setEditValue] = useState("");
  const [newTask, setNewTask] = useState("");

  const getGoalDetails = async () => {
    try {
      const response = await getArcById(arcId);

      // console.log(response);
      if (!response?.todo) {
        router.push(`/createarc/todo/${arcId}`);
        return;
      }

      // console.log(response.todo);
      //@ts-ignore
      setTasks(response?.todo);
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };
  useLayoutEffect(() => {
    // scheduleTasks();
    getGoalDetails();
  }, []);

  // const startEditing = (index: any) => {
  //   setEditIndex(index);
  //   setEditValue(tasks[index]);
  // };

  // const handleEditChange = (e: any) => {
  //   setEditValue(e.target.value);
  // };

  const handleNewTaskChange = (e: any) => {
    setNewTask(e.target.value);
  };

  const addNewTask = async () => {
    if (newTask.trim()) {
      try {
        const addedTask = await AddSingleTodo(arcId, newTask.trim());
        //@ts-ignore
        setTasks([...tasks, addedTask]);
        setNewTask("");
      } catch (error) {
        console.error("Error adding new task:", error);
      }
    }
  };
  const deleteTask = async (id: any) => {
    // console.log(id);
    //@ts-ignore
    const updatedTasks = tasks.filter((task) => task.id !== id);
    // console.log(updatedTasks);

    setTasks(updatedTasks);
    await deleteTodoByID(id, arcId);
  };
  return (
    <div
      className="fixed inset-0 bg-gray-900 backdrop-blur-2xl flex justify-center bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 300, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <div className="mt-12  shadow-md h-[700px] border-gray-800 border   max-h-[1000px] lg:w-[600px] flex flex-col bg-black/60 rounded-xl lg:mx-8 mx-4 gap-3">
          {" "}
          <div className=" m-4 flex justify-end ">
            <button
              onClick={() => {
                setShowEditModal(false);
                getGoalDetail();
              }}
            >
              <X color="gray" />
            </button>
          </div>
          <div className=" flex flex-col justify-between   ">
            <div className="lg:mx-10 mx-4 flex flex-col items-center  mb-10 ">
              <div className=" mb-4 flex items-center gap-2 lg:w-[500px]">
                <Input
                  className=" w-full bg-black/20 border-gray-900 text-gray-100"
                  type="text"
                  placeholder="Add new task"
                  value={newTask}
                  onChange={handleNewTaskChange}
                />
                <Button onClick={addNewTask}>Add Task</Button>
              </div>
            </div>
            <div className="overflow-y-scroll h-[350px] px-10 py-2">
              {tasks?.map((task) => (
                <div
                  key={
                    //@ts-ignore
                    task?.id
                  }
                  className="flex items-center justify-between my-5 space-x-2"
                >
                  <label
                    htmlFor={`task-${
                      //@ts-ignore
                      task?.id
                    }`}
                    className="lg:text-lg text-sm font-medium font-nunito text-gray-100 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {
                      //@ts-ignore
                      task?.todo
                    }
                  </label>

                  <div className="flex gap-3">
                    <button
                      onClick={
                        //@ts-ignore
                        () => deleteTask(task.id)
                      }
                      className="ml-auto"
                    >
                      <Trash2 color="gray" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className=" flex justify-end mt-20 mx-10 ">
              {tasks.length > 0 && (
                <Button
                  // onClick={createArcTodos}
                  onClick={() => {
                    setShowEditModal(false);
                    getGoalDetail();
                  }}
                  className=""
                >
                  Save
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default EditGoal;
