import React from "react";
import heroImage from "@/assets/hero.png";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";

function Hero() {
  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
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
      <div className="  flex  flex-col items-center mt-32">
        <motion.h1
          className="text-center font-display text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <div className="text-center text-red-900/opacity-20 text-5xl font-medium text-white/80 ">
            Boost your productivity with Arc
          </div>
        </motion.h1>
        <div className="w-[287px] h-[313px] bg-blue-600 rounded-full blur-[300px]"></div>

        <motion.div
          className=" text-center md:text-2xl"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          Animation Preview
          <Image
            src={heroImage}
            className="  -mt-[300px] relative shadow-xl"
            alt=""
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Hero;
