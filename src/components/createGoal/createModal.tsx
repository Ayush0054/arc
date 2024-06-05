import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/createGoal/datepicker";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import CreateTaskModal from "./createTaskModal";

function CreateModal({ setShowCreate }: { setShowCreate: any }) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [completionDate, setCompletionDate] = useState<Date | null>(null);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [error, setError] = useState<string>("");

  const createGoal = async () => {
    if (!name || !description || !type || !completionDate) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setShowCreateTask(true);
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900 backdrop-blur-xl flex justify-center bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="mt-12 border shadow-md h-[750px] max-h-[1000px] lg:w-[600px] flex flex-col bg-black/60 rounded-xl mx-8 gap-3 border-gray-800">
        <div className="m-4 flex justify-end">
          <button
            onClick={() => {
              setShowCreate(false);
            }}
          >
            <X />
          </button>
        </div>
        {!showCreateTask ? (
          <div className="flex flex-col justify-center items-center mt-6">
            <h1 className="text-3xl font-semibold my-4">Create a new task</h1>
            <div className="flex flex-col w-[500px] gap-8 p-10">
              <div className="grid gap-4">
                <Label className="">Arc Title</Label>
                <Input
                  className=""
                  autoComplete="off"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-4">
                <Label className="">Description</Label>
                <Textarea
                  className=" resize-none h-[140px] "
                  autoComplete="off"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="grid gap-4">
                <Label className="">Type</Label>
                <Input
                  className=""
                  autoComplete="off"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </div>
              <div className="grid gap-4">
                <DatePicker
                  completionDate={completionDate}
                  setCompletionDate={setCompletionDate}
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <Button className="mt-auto" onClick={createGoal}>
                Create Todos
              </Button>
            </div>
          </div>
        ) : (
          <CreateTaskModal
            name={name}
            description={description}
            type={type}
            completionDate={completionDate}
          />
        )}
      </div>
    </div>
  );
}

export default CreateModal;
