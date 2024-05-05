"use client";
import CreateModal from "@/components/createGoal/createModal";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React, { useState } from "react";

function Page() {
  const [showCreate, setShowCreate] = useState(false);
  const handleCreate = () => {
    setShowCreate(true);
  };
  return (
    <div>
      {/* <Card className=" w-[300px] flex gap-2 items-center justify-center h-[100px] p-6 rounded-2xl ">
        <Plus /> Create your first Task
      </Card> */}
      <Button variant="outline" onClick={handleCreate} className="">
        {" "}
        <Plus /> Create your first Task
      </Button>
      {/* <Card className="p-6">
        <CardTitle>learn arc</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          explicabo eum quae consequatur mo
        </CardDescription>
        <h1>Time</h1>
        <h1>Categories badges</h1>
        <h1 className=" mt-6 mb-3">Todos</h1>
        <div className="flex items-center space-x-2">
          
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions...{" "}
            <span className=" text-blue-500">read more</span>
          </label>
        </div>
        <div className=" flex gap-3 mt-4">
          <Button>UpVote</Button>
          <Button variant="secondary">Share</Button>
        </div>
      </Card> */}
      {showCreate && <CreateModal setShowCreate={setShowCreate} />}
    </div>
  );
}

export default Page;
