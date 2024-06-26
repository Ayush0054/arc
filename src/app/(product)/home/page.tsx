"use client";
import { getArcByProfileId } from "@/app/action";
import CreateModal from "@/components/createGoal/createModal";
import ArcPost from "@/components/home/arc-post";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import { initialProfile } from "@/app/lib/createprofile";

import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";

function Page() {
  const [showCreate, setShowCreate] = useState(false);
  const handleCreate = () => {
    setShowCreate(true);
  };
  const initiateProfile = async () => {
    const response = await initialProfile();
    console.log(response?.email);
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

  //animation
  const rippleVariants = {
    start: {
      opacity: 1,
      scale: 0,
    },
    end: {
      opacity: 0,
      scale: 3,
    },
  };

  const rippleTransition = {
    duration: 2,
    ease: "easeInOut",
    repeat: Infinity,
    repeatDelay: 1,
  };
  return (
    <div>
      <div>
        <Button
          variant="outline"
          onClick={handleCreate}
          className=" flex gap-2"
        >
          {" "}
          <Plus /> Create your Task
        </Button>
        {arcs?.length === 0 ? (
          <div className="flex items-center justify-center">
            <div className="relative h-20 w-20 mt-32">
              <motion.div
                className="absolute h-full w-full rounded-full bg-red-500 opacity-0"
                variants={rippleVariants}
                initial="start"
                animate="end"
                transition={rippleTransition}
              ></motion.div>
              <motion.div
                className="absolute h-full w-full rounded-full bg-red-500 opacity-0"
                variants={rippleVariants}
                initial="start"
                animate="end"
                transition={{ ...rippleTransition, delay: 0.5 }}
              ></motion.div>
              <motion.div
                className="absolute h-full w-full rounded-full bg-red-500 opacity-0"
                variants={rippleVariants}
                initial="start"
                animate="end"
                transition={{ ...rippleTransition, delay: 1 }}
              ></motion.div>
            </div>
          </div>
        ) : (
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
        )}
        {showCreate && <CreateModal setShowCreate={setShowCreate} />}
      </div>
    </div>
  );
}

export default Page;
