import React from "react";
import heroImage from "@/assets/hero.png";

import Image from "next/image";

import { motion } from "framer-motion";
import { Badge } from "../ui/badge";

function Hero() {
  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  return (
    <motion.div
      initial="hidden"
      className="lg:mx-20 mx-4"
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
      <div className="  flex  flex-col items-center  lg:mt-32 mt-12">
        <motion.h1
          className="text-center font-display text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Badge className=" bg-blue-400/10 border-blue-800 hover:bg-blue-400/10 lg:text-2xl text-lg px-4 font-bold">
            Alpha version
          </Badge>
          <div className="text-center text-red-900/opacity-20 lg:text-7xl text-4xl font-medium text-white/60 bg-gradient-to-r from-[#203368] via-[#f55e23] to-[#f7d690] bg-[length:var(--bg-size)_100%] bg-clip-text ">
            Boost your productivity with Arc
          </div>
        </motion.h1>
        <div className="w-[287px] h-[313px] bg-blue-600 rounded-full blur-[300px]"></div>

        <motion.div
          className=" text-center md:text-2xl"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Image
            src={heroImage}
            className="  -mt-[300px] lg:w-[1200px] relative shadow-xl"
            alt=""
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Hero;
