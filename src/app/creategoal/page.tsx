"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { DatePicker } from "@/components/createGoal/datepicker";
import { Textarea } from "@/components/ui/textarea";
function Page() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [show, setShow] = useState(false);
  const [completionDate, setCompletionDate] = useState<Date>();

  const createGoal = async () => {
    const data = {
      name: name,
      description: description,
      type: type,
      completiontime: completionDate,
      image: "",
      status: "",
      completionBanner: "",
    };
    const currentTime = new Date().getTime();
    if (completionDate && completionDate.getTime() < currentTime) {
      toast.error("Completion date cannot be in the past.");
      return;
    }
    try {
      const response = await axios.post("/api/goal", data);

      toast("Goal has been created", {
        description: "Sunday, December 03, 2023 at 9:00 AM",
        action: {
          label: "view",
          onClick: () => console.log("Undo"),
        },
      });
      console.log(response);
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };
  const showCompletion = () => {
    setShow(true);
    if (show === true) {
      setShow(false);
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center mt-12">
      <h1 className=" text-3xl font-semibold my-4">Create a new arc</h1>
      <div className="flex flex-col w-[500px]    gap-8 p-10 ">
        <div className=" grid gap-4">
          <Label className="">Name</Label>
          <Input
            className="   focus-visible:ring-white   "
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="  grid  gap-4">
          <Label className="">Description</Label>
          <Textarea
            className="  focus-visible:ring-white    "
            autoComplete="off"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="  grid  gap-4">
          <Label className="">Type</Label>
          <Input
            className="  focus-visible:ring-white  "
            autoComplete="off"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            onCheckedChange={showCompletion}
            checked={show}
            id="airplane-mode"
          />
          <Label htmlFor="airplane-mode">completion Date</Label>
        </div>
        {show && (
          <div className=" grid gap-4 ">
            <DatePicker
              completionDate={completionDate}
              setCompletionDate={setCompletionDate}
            />
          </div>
        )}
        <Button>Submit</Button>
      </div>
    </div>
  );
}

export default Page;
