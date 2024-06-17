import React from "react";
import img from "@/assets/notes2.png";
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
      <div className="relative     ">
        <GridPattern
          width={100}
          height={100}
          x={-1}
          y={-1}
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
          )}
        />
        <div className="   flex justify-between  items-start  mt-32 ">
          <motion.h1
            className=" font-nunito tracking-[-0.02em] mt-12 drop-shadow-sm md:text-7xl md:leading-[5rem]"
            initial="hidden"
            animate="visible"
            transition={{ duration: 1 }}
            variants={variants1}
          >
            <div className=" w-[550px] lg:ml-20 ml-4   ">
              <Badge className=" text-xl border-green-700/50 bg-green-300/10 text-green-700 font-bold  px-5 hover:bg-green-300/10  border-2 ">
                AI Notes
              </Badge>
              <h1 className=" text-5xl font-sans font-semibold mt-5">
                Create Notes for every Arc
              </h1>
              <h3 className="text-2xl font-normal flex gap-1 mt-4  items-center">
                <DotIcon />
                notion style editor
              </h3>

              <h3 className="text-2xl font-normal  mt-1  flex gap-1  items-center">
                <DotIcon />
                use ai to create notes
              </h3>
              <h3 className="text-2xl font-normal   mt-1  flex gap-1 items-center">
                <DotIcon />
                Export notes to Notion
              </h3>
            </div>
          </motion.h1>
          <div>
            <div className="w-[490px] h-[513px] bg-blue-500 rounded-full blur-[300px]"></div>

            <motion.div
              className=" text-center md:text-2xl"
              variants={FADE_DOWN_ANIMATION_VARIANTS}
            >
              <Image
                src={img}
                className=" w-[600px]  -mt-[460px] relative  shadow-xl"
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
