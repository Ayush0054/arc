"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import axios from "axios";

import { toast } from "sonner";
import { DatePicker } from "@/components/createGoal/datepicker";
import { Textarea } from "@/components/ui/textarea";
import { initialProfile } from "@/lib/createprofile";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Page() {
  const navigate = useRouter();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [show, setShow] = useState(false);
  const [completionDate, setCompletionDate] = useState<Date>();

  const create = async () => {
    const response = await initialProfile();
    console.log(response);
  };
  useEffect(() => {
    create();
  }, []);

  const showCompletion = () => {
    setShow(true);
    if (show === true) {
      setShow(false);
    }
  };
  // ai
  const createGoal = async () => {
    const data = {
      title: name,
      description: description,
      type: type,
      completiontime: completionDate,
      image: "",
      status: "",
    };
    const currentTime = new Date().getTime();
    if (completionDate && completionDate.getTime() < currentTime) {
      toast.error("Completion date cannot be in the past.");
      return;
    }
    try {
      const response = await axios.post("/api/createarc", data);
      console.log(response.data);

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
  return (
    <div>
      <div className=" flex flex-col justify-center items-center mt-6">
        <h1 className=" text-3xl font-semibold my-4">Create a new arc</h1>
        <div className="flex flex-col w-[500px]    gap-8 p-10 ">
          <div className=" grid gap-4">
            <Label className="">Arc Title</Label>
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
          <div className=" flex justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                onCheckedChange={showCompletion}
                checked={show}
                id="completion-date"
              />
              <Label htmlFor="completion-date">completion Date</Label>
            </div>
          </div>
          {show && (
            <div className=" grid gap-4 ">
              <DatePicker
                completionDate={completionDate}
                setCompletionDate={setCompletionDate}
              />
            </div>
          )}

          <Button onClick={createGoal}>Create Todos</Button>
          {/* <Button onClick={Show}>show modal</Button> */}
        </div>
      </div>
    </div>
  );
}

export default Page;
// want to learn flutter development for making eccomerce app for selling pets products
// flutter development
