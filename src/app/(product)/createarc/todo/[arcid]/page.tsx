"use client";
import React, { useEffect, useState } from "react";

import { PenIcon, Plus, X, Trash2, Pen, Stars } from "lucide-react";

import "@blocknote/core/fonts/inter.css";
import { Input } from "@/components/ui/input";

// import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import axios from "axios";
import { getArcById } from "./action";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
interface Params {
  params: { arcid: string };
}

function Page({ params }: Params) {
  const { push } = useRouter();
  const router = useRouter();
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [type, setType] = useState<string>();
  const [completionDate, setCompletionDate] = useState<Date>();
  const [theInput, setTheInput] = useState("");
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

  // TODO : function to check if todos already existed then redirect to arc]id] page

  const getGoalDetails = async () => {
    try {
      const response = await getArcById(params.arcid);

      console.log(response);
      if (response?.todo) {
        router.push(`/arc/${params.arcid}`);
      }
      setTitle(response?.title);
      setDescription(response?.description);
      setType(response?.type);
      setCompletionDate(response?.completiontime);
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };
  const checkcachedTask = async () => {
    const cachedTask = JSON.parse(localStorage.getItem(`task ${params.arcid}`));
    if (cachedTask) {
      setTasks(await cachedTask);
    }
  };
  useEffect(() => {
    getGoalDetails();
    checkcachedTask();
  }, []);

  const CreateTodosFromAi = async () => {
    checkcachedTask();
    setIsLoading(true);
    let temp = messages;
    temp.push({
      role: "user",
      content: `title for task : ${title} description for task : ${description}  type of task : ${type}  completion date : ${completionDate} `,
    });
    setMessages(temp);
    setTheInput("");
    console.log("Calling OpenAI...");
    console.log(title, description, type, completionDate);

    console.log(messages[0].content);

    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ messages }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.content);
    const regex = /"\d+\..+?"/g;
    const matches = output.content.match(regex);
    const newTasks = matches ? matches.map((match) => match.slice(1, -1)) : [];

    const regexToRemoveNumbering = /^\d+\.\s+/;
    const newTasks2 = newTasks.map((task) =>
      task.replace(regexToRemoveNumbering, "")
    );
    console.log(newTasks2);

    setMessages((prevMessages) => [...prevMessages, output]);
    const updatedTasks = [...tasks, ...newTasks2];
    setTasks(updatedTasks); // Update tasks based on matches

    // Move the localStorage operation inside a callback to ensure it happens after state updates
    if (newTasks.length > 0) {
      localStorage.setItem(
        `task ${params.arcid}`,
        JSON.stringify(updatedTasks)
      );
    }

    setIsLoading(false);
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditValue(tasks[index]);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const saveEdit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editValue;
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditValue("");
  };

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const addNewTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()]);
      localStorage.setItem(
        `task ${params.arcid}`,
        JSON.stringify([...tasks, newTask.trim()])
      );
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    localStorage.setItem(`task ${params.arcid}`, JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };
  const createArcTodos = async () => {
    const data = {
      arcId: params.arcid,
      todos: tasks,
    };
    try {
      const response = await axios.post("/api/todo", data);
      console.log(response);
      localStorage.removeItem(`task ${params.arcid}`);
      router.push(`/arc/${params.arcid}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" flex flex-col items-center ">
      <div className=" lg:w-[1000px] justify-center flex flex-col mx-8 ">
        <div className=" flex flex-col items-center">
          <div className="mx-4 mb-4 flex items-center gap-2 w-full">
            <Input
              className=" w-full"
              type="text"
              placeholder="Add new task"
              value={newTask}
              onChange={handleNewTaskChange}
            />
            <Button onClick={addNewTask}>Add Task</Button>
          </div>
          <Button onClick={CreateTodosFromAi} className=" w-3/4 flex gap-2">
            Create Task using Ai <Stars />
          </Button>
        </div>
        {tasks?.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between my-5 space-x-2"
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
                <Button onClick={() => saveEdit(index)}>Save</Button>
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
        <div className=" flex justify-end">
          {tasks && (
            <Button onClick={createArcTodos} className="">
              Create Task
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
