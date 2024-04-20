"use client";
import ProgressModal from "@/components/arc/progress-modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Pen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

function Page() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className=" flex flex-col justify-center container   mt-6">
      <div className=" flex items-center gap-3">
        30%
        <Progress value={30} className=" my-4" />
      </div>
      <div>
        <h1 className=" text-3xl font-semibold text-start ">learn Rust</h1>

        <h2 className=" text-xl font-medium text-start mt-6">
          {" "}
          making trading system with rust
        </h2>
      </div>
      <div className=" my-4 flex items-center gap-2">
        <h1></h1>
        <Input
          type="text"
          placeholder="Add new task"
          // value={newTask}
          // onChange={handleNewTaskChange}
        />
        <Button
        // onClick={addNewTask}
        >
          Add Task
        </Button>
        <Button variant="outline">add Notes</Button>
      </div>
      <div className="flex items-center justify-between my-5 space-x-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
        <div className=" flex gap-2 items-center">
          <Button variant="outline">Add progress</Button>
          <Pen />
          <Trash2 />
        </div>
      </div>
      <div className="flex items-center justify-between my-5 space-x-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm line-through text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
        <div className=" flex gap-2 items-center">
          <Button variant="outline">Add progress</Button>
          <Pen />
          <Trash2 />
        </div>
      </div>
      <div className="flex items-center justify-between my-5 space-x-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
        <div className=" flex gap-2 items-center">
          <Button variant="outline">Add progress</Button>
          <Pen />
          <Trash2 />
        </div>
      </div>
      <div className="flex items-center justify-between my-5 space-x-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
        <div className=" flex gap-2 items-center">
          <Button variant="outline">Add progress</Button>
          <Pen />
          <Trash2 />
        </div>
      </div>
      <div className=" flex gap-6">
        <Button>Updates</Button>
        <Button variant="secondary">Save changes</Button>
      </div>
      {showModal && <ProgressModal />}
    </div>
  );
}

export default Page;
