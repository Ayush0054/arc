import React from "react";
import img from "@/assets/calendar3.png";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/app/lib/utils";
import { Clock1 } from "lucide-react";
import AnimatedGridPattern from "../ui/animated-grid";
function CalendarFeature() {
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
      className="mt-32"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
    >
      <div className=" relative">
        <AnimatedGridPattern
          width={100}
          height={100}
          numSquares={30}
          maxOpacity={0.3}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
          )}
        />
        <div className="  flex justify-between items-center  lg:mr-20 mr-4">
          <div>
            <div className="w-[490px] h-[513px] bg-blue-500 rounded-full blur-[300px]"></div>
            <motion.div
              className=" shadow-xl"
              variants={FADE_DOWN_ANIMATION_VARIANTS}
            >
              <Image
                src={img}
                className=" -mt-[460px] relative   w-[600px]  shadow-xl"
                alt=""
              />
            </motion.div>
          </div>
          <motion.h1
            className=" font-nunito tracking-[-0.02em]  drop-shadow-sm md:text-7xl md:leading-[5rem]"
            initial="hidden"
            animate="visible"
            transition={{ duration: 1 }}
            variants={variants1}
          >
            <div className=" w-[550px] text-start ">
              <div className="w-[207px] h-[243px] bg-blue-600 rounded-full blur-[300px]"></div>
              <div className="font-bold ml-5 text-4xl flex gap-3 items-center -mt-[300px] relative ">
                <Clock1 />
                <span className="text-5xl font-sans font-semibold mt-5">
                  Set reminder for your tasks
                </span>
              </div>

              <h3 className="text-2xl p-5 bg-black/40 mt-1 rounded-lg">
                Every task have their own reminder button
              </h3>

              <h3 className="text-2xl p-5 bg-black/40 mt-1 rounded-lg">
                We are using google calendar to set reminder
              </h3>
            </div>
          </motion.h1>
        </div>
      </div>
    </motion.div>
  );
}

export default CalendarFeature;
