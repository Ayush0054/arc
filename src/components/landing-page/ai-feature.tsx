import React from "react";
import img from "@/assets/ai-tasks.png";
import { motion } from "framer-motion";
import Image from "next/image";
import { Dot } from "lucide-react";
import { cn } from "@/app/lib/utils";
function AiFeature() {
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
      <div className="   flex justify-between  items-start  mt-32 ml-20">
        <motion.h1
          className=" font-nunito tracking-[-0.02em] mt-12 drop-shadow-sm md:text-7xl md:leading-[5rem]"
          initial="hidden"
          animate="visible"
          transition={{ duration: 1 }}
          variants={variants1}
        >
          <div className=" w-[550px] bg-black/40 rounded-xl p-5 ">
            <div className="font-bold  text-4xl flex gap-3 ">
              ✨
              <span
                className={cn(
                  `inline animate-gradient  bg-gradient-to-r from-[#203368] via-[#f55e23] to-[#f8b421] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                )}
              >
                Create Tasks from AI
              </span>
            </div>

            <h3 className="text-2xl p-5  bg-black/40 rounded-lg ">
              Arc creates task from Goal, Description and Completion date
            </h3>

            <h3 className="text-2xl p-5 bg-black/40 mt-1 rounded-lg ">
              Tasks are automatically divided and are set to complete before
              completion date
            </h3>
          </div>
        </motion.h1>
        <div>
          <div className="w-[207px] h-[243px] bg-blue-600 rounded-full blur-[300px]"></div>

          <motion.div
            className=" text-center md:text-2xl"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Image
              src={img}
              className=" w-[700px] -mt-[300px] relative  shadow-xl"
              alt=""
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default AiFeature;
