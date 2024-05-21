"use client";
import { getArcByProfileId } from "@/app/actions/action";
import CreateModal from "@/components/createGoal/createModal";
import ArcPost from "@/components/home/arc-post";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";

function Page() {
  const [showCreate, setShowCreate] = useState(false);
  const handleCreate = () => {
    setShowCreate(true);
  };
  const [arcs, setArcs] = useState([]);
  const getArcs = async () => {
    const res = await getArcByProfileId();
    setArcs(res?.arcs);
    console.log(res?.arcs);
  };
  useEffect(() => {
    getArcs();
  }, []);
  return (
    <div>
      {/* <Card className=" w-[300px] flex gap-2 items-center justify-center h-[100px] p-6 rounded-2xl ">
        <Plus /> Create your first Task
      </Card> */}
      <Button variant="outline" onClick={handleCreate} className="">
        {" "}
        <Plus /> Create your first Task
      </Button>
      <div className=" flex flex-wrap gap-6 my-5">
        {arcs?.map((arc) => (
          <ArcPost arc={arc} key={arc?.id} />
        ))}
      </div>
      {showCreate && <CreateModal setShowCreate={setShowCreate} />}
    </div>
  );
}

export default Page;
