"use client";
import { getArcByProfileId } from "@/app/action";
import CreateModal from "@/components/createGoal/createModal";
import ArcPost from "@/components/home/arc-post";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { initialProfile } from "@/app/lib/createprofile";

import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Page() {
  const [showCreate, setShowCreate] = useState(false);
  const handleCreate = () => {
    setShowCreate(true);
  };
  const initiateProfile = async () => {
    const response = await initialProfile();
    console.log(response.email);
  };
  useEffect(() => {
    initiateProfile();
  }, []);
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
      {arcs && (
        <div>
          <Button
            variant="outline"
            onClick={handleCreate}
            className=" flex gap-2"
          >
            {" "}
            <Plus /> Create your Task
          </Button>
          <div className=" flex flex-wrap gap-6 my-5">
            {arcs?.map((arc) => (
              <ArcPost
                arc={arc}
                key={
                  //@ts-ignore
                  arc?.id
                }
              />
            ))}
          </div>
          {showCreate && <CreateModal setShowCreate={setShowCreate} />}
        </div>
      )}
    </div>
  );
}

export default Page;
