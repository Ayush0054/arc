import React from "react";
import img from "@/assets/calendar3.png";
import img2 from "@/assets/calendar-full.png";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/app/lib/utils";
import { ArrowBigRightDash } from "lucide-react";
import AnimatedGridPattern from "../ui/animated-grid";
import GridPattern from "../ui/grid-pattern";
function CalendarFeature() {
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
      <div className=" relative max-lg:mx-4">
        <AnimatedGridPattern
          width={100}
          height={100}
          numSquares={30}
          maxOpacity={0.3}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)] hidden lg:block"
          )}
        />
        <GridPattern
          width={100}
          height={100}
          x={-1}
          y={-1}
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)] lg:hidden block"
          )}
        />
        <div className="  max-lg:flex-col flex justify-between items-start  lg:mr-20 ">
          <div>
            <div className="lg:w-[490px] lg:h-[513px] bg-blue-500 rounded-full blur-[300px] "></div>
            <motion.div
              className=" shadow-xl"
              variants={FADE_DOWN_ANIMATION_VARIANTS}
            >
              <Image
                src={img}
                className=" lg:-mt-[460px] relative   lg:w-[600px]  shadow-xl hidden lg:block"
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
            <div className=" lg:w-[550px] text-start lg:mt-32 ">
              <div className="lg:w-[207px] lg:h-[243px] bg-blue-600 rounded-full blur-[300px]"></div>
              <div className="font-bold  text-4xl  lg:-mt-[300px] relative ">
                <span className="lg:text-4xl text-2xl font-sans font-semibold mt-5">
                  Set{" "}
                  <span className=" bg-primary/80 px-2 rounded-md">
                    reminder
                  </span>{" "}
                  for your tasks
                </span>
              </div>

              <h3 className="lg:text-2xl text-lg flex items-center gap-1  mt-1 rounded-lg">
                <ArrowBigRightDash />
                Every task have their own reminder button
              </h3>

              <h3 className="lg:text-2xl text-lg flex items-center gap-1  mt-1 rounded-lg">
                <ArrowBigRightDash />
                We are using google calendar to set reminder
              </h3>
            </div>
          </motion.h1>
          <div className="lg:hidden block">
            <div className="lg:w-[490px] lg:h-[513px] bg-blue-500 rounded-full blur-[300px] "></div>
            <motion.div
              className=" shadow-xl"
              variants={FADE_DOWN_ANIMATION_VARIANTS}
            >
              <Image
                src={img2}
                className=" lg:-mt-[460px] relative   lg:w-[600px] w-[390px] shadow-xl  mt-12"
                alt=""
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CalendarFeature;
