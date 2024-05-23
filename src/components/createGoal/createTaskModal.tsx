import React, { useState } from "react";

import { Trash2, Pen, Stars } from "lucide-react";

import "@blocknote/core/fonts/inter.css";
import { Input } from "@/components/ui/input";

import axios from "axios";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function CreateTaskModal({
  arcId,
  name,
  description,
  type,
  completionDate,
}: {
  arcId: string;
  name: string;
  description: string;
  type: string;
  completionDate: any;
}) {
  const { push } = useRouter();
  const router = useRouter();
  //   const [title, setTitle] = useState<string>();
  //   const [description, setDescription] = useState<string>();
  //   const [type, setType] = useState<string>();
  //   const [completionDate, setCompletionDate] = useState<Date>();
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

  const CreateTodosFromAi = async () => {
    setIsLoading(true);
    let temp = messages;
    temp.push({
      role: "user",
      content: `title for task : ${name} description for task : ${description}  type of task : ${type} today date : ${new Date()}  completion date : ${completionDate} `,
    });
    setMessages(temp);
    setTheInput("");
    console.log("Calling OpenAI...");
    console.log(name, description, type, completionDate);

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
    //@ts-ignore
    const newTasks = matches ? matches.map((match) => match.slice(1, -1)) : [];

    const regexToRemoveNumbering = /^\d+\.\s+/;
    //@ts-ignore
    const newTasks2 = newTasks.map((task) =>
      task.replace(regexToRemoveNumbering, "")
    );
    console.log(newTasks2);

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
    // localStorage.setItem(`task ${params.arcid}`, JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };
  const createArcTodos = async () => {
    const data = {
      arcId: arcId,
      todos: tasks,
    };
    try {
      const response = await axios.post("/api/todo", data);
      console.log(response);
      localStorage.removeItem(`task ${arcId}`);
      router.push(`/arc/${arcId}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
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
      <div className="overflow-y-scroll h-[350px] px-10 py-2 bg-slate-50">
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
      <div className=" flex justify-end mt-20 mx-10 ">
        {tasks.length > 0 && (
          <Button disabled={isLoading} onClick={createArcTodos} className="">
            Create Task
          </Button>
        )}
      </div>
    </div>
  );
}

export default CreateTaskModal;
