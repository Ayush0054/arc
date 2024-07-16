import React from "react";
import img from "@/assets/notes2.png";
import img2 from "@/assets/notes-full.png";
import { motion } from "framer-motion";
import Image from "next/image";
import { Dot, DotIcon } from "lucide-react";
import { cn } from "@/app/lib/utils";
import GridPattern from "../ui/grid-pattern";
import { Badge } from "../ui/badge";
function NotesFeature() {
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
      <div className="relative  max-lg:mx-4    ">
        <GridPattern
          width={100}
          height={100}
          x={-1}
          y={-1}
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)] w-400px"
          )}
        />
        <div className=" max-lg:flex-col   flex justify-between  items-start  mt-32 ">
          <motion.h1
            className=" font-nunito tracking-[-0.02em] mt-12 drop-shadow-sm md:text-7xl md:leading-[5rem]"
            initial="hidden"
            animate="visible"
            transition={{ duration: 1 }}
            variants={variants1}
          >
            <div className=" lg:w-[550px] lg:ml-20   ">
              <Badge className=" text-white lg:text-xl text-lg bg-blue-400/10 border-blue-800 hover:bg-blue-400/10 lg:font-bold font-semibold  px-5  border-2 ">
                AI Notes
              </Badge>
              <h1 className=" lg:text-4xl text-2xl font-sans font-semibold mt-5">
                Create Notes for every Arc
              </h1>
              <h3 className="lg:text-2xl text-lg font-normal flex gap-1 mt-4  items-center">
                <DotIcon />
                notion style editor
              </h3>

              <h3 className="lg:text-2xl text-lg font-normal  mt-1  flex gap-1  items-center">
                <DotIcon />
                use ai to create notes{" "}
                <Badge className=" text-white bg-blue-400/10 border-blue-800 hover:bg-blue-400/10  text-lg  lg:font-bold font-semibold">
                  coming soon
                </Badge>
              </h3>
              <h3 className="lg:text-2xl text-lg font-normal   mt-2  flex gap-1 items-center">
                <DotIcon />
                Export notes to Notion{" "}
                <Badge className=" text-white bg-blue-400/10 border-blue-800 hover:bg-blue-400/10  text-lg  lg:font-bold font-semibold">
                  coming soon
                </Badge>
              </h3>
            </div>
          </motion.h1>
          <div>
            <div className="lg:w-[490px] lg:h-[513px] bg-blue-500 rounded-full blur-[300px]"></div>

            <motion.div
              className=" text-center md:text-2xl"
              variants={FADE_DOWN_ANIMATION_VARIANTS}
            >
              <Image
                src={img}
                className=" lg:w-[600px]   lg:-mt-[460px] relative  shadow-xl hidden lg:block"
                alt=""
              />
              <Image
                src={img2}
                className=" lg:-mt-[460px] relative   lg:w-[600px] w-[390px]  shadow-xl lg:hidden block mt-12"
                alt=""
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default NotesFeature;
