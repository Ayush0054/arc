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
import PreviewModal from "@/components/createGoal/preview-modal";
import Preview from "@/components/createGoal/preview";
function Page() {
  const navigate = useRouter();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [show, setShow] = useState(false);
  const [completionDate, setCompletionDate] = useState<Date>();
  const [showModal, setShowModal] = useState(false);
  const create = async () => {
    const response = await initialProfile();
    console.log(response);
  };
  useEffect(() => {
    create();
  }, []);
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
  // ai
  const [theInput, setTheInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [task, setTask] = useState([]);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `hey give the task and make the todo`,
    },
  ]);
  const Show = () => {
    setShowModal(true);
  };
  const callGetResponse = async () => {
    setIsLoading(true);
    let temp = messages;
    temp.push({
      role: "user",
      content: `title for task : ${name} description for task : ${description}  type of task : ${type}  completion date : ${completionDate} `,
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
    setMessages((prevMessages) => [...prevMessages, output]);
    setTask(matches ? matches.map((match: any) => match.slice(1, -1)) : []);
    // setShowModal(true);
    setPreview(true);
    setIsLoading(false);
  };
  // useEffect(() => {
  //   callGetResponse();
  // }, []);

  const handleClick = (event: React.MouseEvent) => {
    // navigate.push("/createarc/preview");
    event.preventDefault();
    callGetResponse();
  };
  const [preview, setPreview] = useState(false);
  const checkedFunc = () => {
    setPreview(true);
    if (preview === true) {
      setPreview(false);
    }
  };
  return (
    <div>
      <div className=" p-3 mt-8 flex justify-start gap-2">
        <Switch checked={preview} onCheckedChange={checkedFunc} /> Preview
      </div>
      {!preview ? (
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
              <div className="flex items-center space-x-2">
                <Switch id="private-mode" />
                <Label htmlFor="private-mode">Private</Label>
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

            <Button onClick={handleClick}>Create Todos</Button>
            {/* <Button onClick={Show}>show modal</Button> */}
          </div>
        </div>
      ) : (
        <Preview task={task} />
      )}
      {showModal && (
        <PreviewModal task={task} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default Page;
// want to learn flutter development for making eccomerce app for selling pets products
// flutter development
