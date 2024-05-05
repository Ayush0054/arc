import {
  AddSingleTodo,
  deleteTodoByID,
  getArcById,
  updateTodo,
} from "@/app/(product)/createarc/todo/[arcid]/action";
import React, { useLayoutEffect, useState } from "react";
import { Button } from "../ui/button";
import { Pen, Stars, Trash2, X } from "lucide-react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

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
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [newTask, setNewTask] = useState("");

  const getGoalDetails = async () => {
    try {
      const response = await getArcById(arcId);

      console.log(response);
      if (!response?.todo) {
        router.push(`/createarc/todo/${arcId}`);
        return;
      }

      console.log(response.todo);

      setTasks(response?.todo);
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };
  useLayoutEffect(() => {
    // scheduleTasks();
    getGoalDetails();
  }, []);

  const startEditing = (index) => {
    setEditIndex(index);
    setEditValue(tasks[index]);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const addNewTask = async () => {
    if (newTask.trim()) {
      try {
        const addedTask = await AddSingleTodo(arcId, newTask.trim());
        setTasks([...tasks, addedTask]);
        setNewTask("");
      } catch (error) {
        console.error("Error adding new task:", error);
      }
    }
  };
  const deleteTask = async (id) => {
    console.log(id);
    const updatedTasks = tasks.filter((task) => task.id !== id);
    console.log(updatedTasks);

    setTasks(updatedTasks);
    await deleteTodoByID(id, arcId);
  };
  return (
    <div
      className="fixed inset-0 bg-gray-100 flex justify-center bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="mt-12 border shadow-md h-[700px]   max-h-[1000px] lg:w-[600px] flex flex-col bg-white rounded-xl mx-8 gap-3 border-gray-300">
        {" "}
        <div className=" m-4 flex justify-end ">
          <button
            onClick={() => {
              setShowEditModal(false);
            }}
          >
            <X />
          </button>
        </div>
        <div className=" flex flex-col justify-between   ">
          <div className="mx-10 flex flex-col items-center  mb-10 ">
            <div className=" mb-4 flex items-center gap-2 w-[500px]">
              <Input
                className=" w-full"
                type="text"
                placeholder="Add new task"
                value={newTask}
                onChange={handleNewTaskChange}
              />
              <Button onClick={addNewTask}>Add Task</Button>
            </div>
          </div>
          <div className="overflow-y-scroll h-[350px] px-10 py-2 bg-slate-50">
            {tasks?.map((task) => (
              <div
                key={task?.id}
                className="flex items-center justify-between my-5 space-x-2"
              >
                <label
                  htmlFor={`task-${task?.id}`}
                  className="text-lg font-medium font-nunito text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {task.todo}
                </label>

                <div className="flex gap-3">
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="ml-auto"
                  >
                    <Trash2 />
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
    </div>
  );
}

export default EditGoal;
