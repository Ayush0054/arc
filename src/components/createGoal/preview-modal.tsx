// import React, { useState } from "react";
// import { Button } from "../ui/button";
// import { PenIcon, Plus, X } from "lucide-react";
// import { Checkbox } from "../ui/checkbox";
// import { Input } from "../ui/input";
// import "@blocknote/core/fonts/inter.css";
// // import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
// import "@blocknote/react/style.css";
// function PreviewModal({ onClose, task }: { onClose: () => void; task: any }) {
//   const [isEditMode, setIsEditMode] = useState(false);
//   //   const editor = useCreateBlockNote();
//   // Function to toggle edit mode
//   const toggleEditMode = () => {
//     setIsEditMode(!isEditMode);
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-gray-100 flex  justify-center  bg-opacity-50 overflow-y-auto h-full w-full  "
//       id="my-modal"
//     >
//       <div className=" mt-8  border   shadow-md h-[800px] lg:w-[700px] flex flex-col     bg-white rounded-xl mx-8  gap-3  border-gray-300">
//         <div className="flex items-start justify-end mx-6 mt-6">
//           <div onClick={onClose} className=" cursor-pointer ">
//             <X />
//           </div>
//         </div>
//         <div className=" flex justify-between mx-4">
//           <h1>Todos</h1>
//           <Button variant="outline">
//             <Plus /> Add
//           </Button>
//           <Button onClick={toggleEditMode} variant="outline">
//             <PenIcon /> Edit
//           </Button>
//         </div>
//         <div className=" mx-4">
//           {/* {task} */}
//           {task?.map((item, index) => (
//             <div key={index} className="flex items-center my-5 space-x-2">
//               <Checkbox id={`task-${index}`} disabled={!isEditMode} />
//               {isEditMode ? (
//                 <Input
//                   type="text"
//                   value={item}
//                   onChange={(e) => {
//                     /* Handle change */
//                   }}
//                   className="text-sm font-medium leading-none w-full border-none p-0 m-0 h-6 focus-visible:ring-0 focus-visible:outline-none"
//                 />
//               ) : (
//                 <label
//                   htmlFor={`task-${index}`}
//                   className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                 >
//                   {item}
//                 </label>
//               )}
//             </div>
//           ))}
//         </div>
//         {/* <BlockNoteView editor={editor} data-theming-css-variables-demo />; */}
//         <Button
//           className="  text-sm  font-semibold  cursor-pointer mt-auto mx-6 mb-6"
//           onClick={onClose}
//         >
//           Create arc
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default PreviewModal;

import React, { useState } from "react";
import { Button } from "../ui/button";
import { PenIcon, Plus, X, Trash2 } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import "@blocknote/core/fonts/inter.css";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
// Styles omitted for brevity

function PreviewModal({ onClose, task }) {
  const [tasks, setTasks] = useState(task); // Use state to manage tasks
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [newTask, setNewTask] = useState(""); // State for new task input

  // Function to toggle edit mode
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  // Start editing a specific task
  const startEditing = (index) => {
    setEditIndex(index);
    setEditValue(tasks[index]);
  };

  // Handle change in textarea for editing
  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  // Save the edited task
  const saveEdit = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editIndex] = editValue;
    setTasks(updatedTasks); // Update the tasks array with the edited task
    setIsEditMode(false);
    setEditIndex(null);
    setEditValue("");
  };

  // Handle new task input change
  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  // Function to add new task
  const addNewTask = () => {
    if (newTask.trim()) {
      // Check if the newTask is not just empty spaces
      setTasks([...tasks, newTask.trim()]);
      setNewTask(""); // Clear the input after adding
    }
  };
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  };
  return (
    <div
      className="fixed inset-0 bg-gray-100 flex justify-center bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="mt-8 border shadow-md h-[800px] lg:w-[800px] flex flex-col bg-white rounded-xl mx-8 gap-3 border-gray-300">
        <div className="flex items-start justify-end mx-6 mt-6">
          <div onClick={onClose} className="cursor-pointer">
            <X />
          </div>
        </div>
        <div className="flex justify-between mx-4">
          <h1>Todos</h1>
          <Button variant="outline" onClick={toggleEditMode}>
            <PenIcon /> Edit
          </Button>
        </div>
        <div className="mx-4">
          {tasks.map((item, index) => (
            <div key={index} className="flex items-center my-5 space-x-2">
              <Checkbox id={`task-${index}`} disabled={!isEditMode} />
              {editIndex === index ? (
                <Textarea
                  value={editValue}
                  onChange={handleEditChange}
                  className="text-sm font-medium leading-none w-full border p-2 resize-y"
                />
              ) : (
                <label
                  htmlFor={`task-${index}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  onDoubleClick={() => startEditing(index)}
                >
                  {item}
                </label>
              )}
              {isEditMode && (
                <button onClick={() => deleteTask(index)} className="ml-auto">
                  <Trash2 />{" "}
                  {/* Assuming Trash2 is your delete icon component */}
                </button>
              )}
            </div>
          ))}
          {isEditMode && (
            <Button onClick={saveEdit} className="mx-auto">
              Save Changes
            </Button>
          )}
        </div>
        <div className="mx-4">
          <Input
            type="text"
            placeholder="Add new todo"
            value={newTask}
            onChange={handleNewTaskChange}
            // className="border p-2 w-full"
          />
          <Button onClick={addNewTask} className="mt-2">
            Add Todo
          </Button>
        </div>
        <Button
          className="text-sm font-semibold cursor-pointer mt-auto mx-6 mb-6"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
  );
}

export default PreviewModal;
