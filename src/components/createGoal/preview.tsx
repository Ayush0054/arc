import React, { useState } from "react";
import { Button } from "../ui/button";
import { PenIcon, Plus, X, Trash2, Pen } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import "@blocknote/core/fonts/inter.css";
// import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

function Preview({ task }: { task: any }) {
  const [tasks, setTasks] = useState(task);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [newTask, setNewTask] = useState("");

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
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className=" flex flex-col items-center ">
      <div className=" lg:w-[1000px] justify-center flex flex-col mx-8 ">
        <div className="mx-4 mb-4 flex items-center gap-2">
          <Input
            type="text"
            placeholder="Add new task"
            value={newTask}
            onChange={handleNewTaskChange}
          />
          <Button onClick={addNewTask}>Add Task</Button>
        </div>
        {tasks.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between my-5 space-x-2"
          >
            {/* <Checkbox id={`task-${index}`} /> */}
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
      </div>
    </div>
  );
}

export default Preview;
