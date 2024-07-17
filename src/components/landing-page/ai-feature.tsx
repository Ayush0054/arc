import React from "react";
import img from "@/assets/ai-tasks2.png";
import img2 from "@/assets/ai-task-full2.png";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowBigRightDash } from "lucide-react";
import { cn } from "@/app/lib/utils";
import GridPattern from "../ui/grid-pattern";
function AiFeature() {
  //framer constants
  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  return (
    <motion.div
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
    >
      <div className="relative max-lg:mx-4    ">
        <GridPattern
          width={100}
          height={100}
          x={-1}
          y={-1}
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
          )}
        />
        <div className=" max-lg:flex-col   flex justify-between  items-start  mt-32 lg:ml-20 ">
          <motion.h1
            className=" font-nunito tracking-[-0.02em] mt-12 drop-shadow-sm md:text-7xl md:leading-[5rem]"
            initial="hidden"
            animate="visible"
            transition={{ duration: 1 }}
            variants={variants1}
          >
            <div className=" lg:w-[550px] bg-black/40 rounded-xl  ">
              <div className="font-bold  lg:text-4xl text-2xl flex gap-3 ">
                Create Tasks from{" "}
                <span className=" bg-primary/80 px-2 rounded-md">AI</span>
              </div>

              <h3 className="lg:text-2xl text-lg  flex gap-1   ">
                <ArrowBigRightDash /> Arc creates task from Goal, Description
                and Completion date
              </h3>

              <h3 className="lg:text-2xl text-lg  mt-1 flex gap-1  ">
                <ArrowBigRightDash /> Tasks are automatically divided and are
                set to complete before completion date
              </h3>
            </div>
          </motion.h1>
          <div className="">
            <div className="lg:w-[490px] lg:h-[513px] bg-blue-500 rounded-full blur-[300px]"></div>

            <motion.div
              className=" text-center md:text-2xl "
              variants={FADE_DOWN_ANIMATION_VARIANTS}
            >
              <Image
                src={img}
                className=" lg:w-[700px] lg:-mt-[460px] relative hidden lg:block  shadow-xl"
                alt=""
              />
              <Image
                src={img2}
                className=" lg:w-[700px] w-[390px] lg:-mt-[460px] relative lg:hidden block  shadow-xl mt-12"
                alt=""
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AiFeature;
