"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Plus } from "lucide-react";

function Page() {
  return (
    <div className=" flex flex-col justify-center items-center mt-12">
      <Progress value={33} className=" w-[600px] " />
      <h1 className=" flex  items-center gap-5 mt-5 font-semibold text-xl">
        Add Todos
        <Plus />
      </h1>
      <div className="flex items-center my-5 space-x-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
      </div>
      <div className=" flex  items-center gap-5">
        <Button variant="outline" className="">
          Go back
        </Button>
        <Button>Create</Button>
      </div>
    </div>
  );
}

export default Page;
