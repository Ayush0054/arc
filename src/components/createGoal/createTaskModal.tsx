import React, { useState } from "react";

import { Trash2, Pen, Stars } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

import axios from "axios";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// import { useAuth, useUser } from "@clerk/nextjs";

function CreateTaskModal({
  name,
  description,
  type,
  completionDate,
}: {
  name: string;
  description: string;
  type: string;
  completionDate: any;
}) {
  const router = useRouter();
  // const { isLoaded, isSignedIn, user } = useUser();
  //   const [title, setTitle] = useState<string>();
  //   const [description, setDescription] = useState<string>();
  //   const [type, setType] = useState<string>();
  //   const [completionDate, setCompletionDate] = useState<Date>();
  // const [theInput, setTheInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `hey give the task and make the todo`,
    },
  ]);
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [newTask, setNewTask] = useState("");
  // const [arc, setArc] = useState();
  const CreateTodosFromAi = async () => {
    setIsLoading(true);
    let temp = messages;
    temp.push({
      role: "user",
      content: `title for task : ${name} description for task : ${description}  type of task : ${type} today date : ${new Date()}  completion date : ${completionDate} `,
    });
    setMessages(temp);
    // setTheInput("");
    // console.log("Calling OpenAI...");
    // console.log(name, description, type, completionDate);

    // console.log(messages[0].content);

    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ messages }),
    });

    const data = await response.json();
    const { output } = data;
    // console.log("OpenAI replied...", output.content);
    console.log(output.content);

    const regex = /"\d+\..+?"/g;
    const matches = output.content.match(regex);
    // console.log(matches);

    //@ts-ignore
    const newTasks = matches ? matches.map((match) => match.slice(1, -1)) : [];

    const regexToRemoveNumbering = /^\d+\.\s+/;
    //@ts-ignore
    const newTasks2 = newTasks.map((task) =>
      task.replace(regexToRemoveNumbering, "")
    );
    // console.log(newTasks2);

    setMessages((prevMessages) => [...prevMessages, output]);
    const updatedTasks = [...tasks, ...newTasks2];
    //@ts-ignore
    setTasks(updatedTasks); // Update tasks based on matches

    // Move the localStorage operation inside a callback to ensure it happens after state updates

    setIsLoading(false);
  };

  const startEditing = (index: any) => {
    setEditIndex(index);
    setEditValue(tasks[index]);
  };

  const handleEditChange = (e: any) => {
    setEditValue(e.target.value);
  };

  const saveEdit = (index: any) => {
    const updatedTasks = [...tasks];
    //@ts-ignore
    updatedTasks[index] = editValue;
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditValue("");
  };

  const handleNewTaskChange = (e: any) => {
    setNewTask(e.target.value);
  };

  const addNewTask = () => {
    if (newTask.trim()) {
      //@ts-ignore
      setTasks([...tasks, newTask.trim()]);

      setNewTask("");
    }
  };
  //@ts-ignore
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);

    setTasks(updatedTasks);
  };

  //   const data = {
  //     arcId: arcId,
  //     todos: tasks,
  //   };
  //   try {
  //     const response = await axios.post("/api/todo", data);
  //     console.log(response);
  //     localStorage.removeItem(`task ${arc?.id}`);
  //     router.push(`/arc/${arc?.id}`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const createGoal = async () => {
  //   const data = {
  //     title: name,
  //     description: description,
  //     type: type,
  //     completiontime: completionDate,
  //     image: "",
  //     status: "",
  //   };
  //   const currentTime = new Date().getTime();
  //   if (completionDate && completionDate.getTime() < currentTime) {
  //     toast.error("Completion date cannot be in the past.");
  //     return;
  //   }
  //   try {
  //     const response = await axios.post("/api/createarc", data);
  //     console.log(response.data);

  //     toast("Goal has been created", {
  //       description: "Sunday, December 03, 2023 at 9:00 AM",
  //       action: {
  //         label: "view",
  //         onClick: () => console.log("Undo"),
  //       },
  //     });
  //     console.log(response.data);
  //     setArc(response.data);
  //     // setShowCreateTask(true);
  //   } catch (error) {
  //     console.error("Error creating goal:", error);
  //   }
  // };
  const createGoalAndTodos = async () => {
    setIsLoading(true);
    const goalData = {
      title: name,
      description: description,
      type: type,
      completiontime: completionDate,
      image: "",
      status: "",
    };
    // console.log(goalData);

    const currentTime = new Date().getTime();
    if (completionDate && completionDate.getTime() < currentTime) {
      toast.error("Completion date cannot be in the past.");
      return;
    }

    try {
      // Create goal
      const goalResponse = await axios.post("/api/createarc", goalData);

      const newArcId = goalResponse.data.id;

      // Data for creating todos
      const todosData = {
        arcId: newArcId,
        todos: tasks,
      };

      // Create todos for the new goal
      await axios.post("/api/todo", todosData);
      toast("Arc and tasks has been created", {
        description: "Goal creation success message",
      });

      setIsLoading(false);
      router.push(`/arc/${newArcId}`);
    } catch (error) {
      console.error("Error in creating goal or todos:", error);
    }
  };
  return (
    <div className=" flex flex-col justify-between   ">
      <div className="mx-10 flex flex-col items-center  mb-10 ">
        <div className=" mb-4 flex items-center gap-2 lg:w-[500px]">
          <Input
            className=" w-full"
            type="text"
            placeholder="Add new task"
            value={newTask}
            onChange={handleNewTaskChange}
          />
          <Button disabled={isLoading} onClick={addNewTask}>
            Add Task
          </Button>
        </div>
        <Button
          onClick={CreateTodosFromAi}
          disabled={isLoading}
          className=" w-3/4 flex gap-2"
        >
          Create Task using Ai <Stars />
        </Button>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="flex space-x-2">
            <motion.div
              className="h-3 w-3 rounded-full bg-red-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
            <motion.div
              className="h-3 w-3 rounded-full bg-red-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 0.3,
              }}
            />
            <motion.div
              className="h-3 w-3 rounded-full bg-red-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 0.6,
              }}
            />
          </div>
        </div>
      ) : (
        <div className="overflow-y-scroll h-[350px] px-10 py-2 ">
          {tasks?.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between mb-5 mt-5 space-x-2 "
            >
              {editIndex === index ? (
                <Input
                  value={editValue}
                  onChange={handleEditChange}
                  className="text-sm font-medium leading-none w-full border resize-y"
                />
              ) : (
                <label
                  htmlFor={`task-${index}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item}
                </label>
              )}
              <div className="flex gap-3">
                {editIndex === index && (
                  <Button disabled={isLoading} onClick={() => saveEdit(index)}>
                    Save
                  </Button>
                )}
                <button onClick={() => deleteTask(index)} className="ml-auto">
                  <Trash2 />
                </button>
                {editIndex !== index && (
                  <button onClick={() => startEditing(index)}>
                    <Pen />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <div
        className={` flex justify-end  ${
          isLoading ? "mt-[430px]" : "mt-20"
        } mx-10 `}
      >
        {tasks.length > 0 && (
          <Button
            disabled={isLoading}
            onClick={createGoalAndTodos}
            className=""
          >
            Create Task
          </Button>
        )}
      </div>
    </div>
  );
}

export default CreateTaskModal;
