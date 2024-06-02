import React from "react";
import heroImage from "@/assets/hero.png";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import Link from "next/link";

function Hero() {
  return (
    <div className="  flex  flex-col items-center mt-32">
      <div className="text-center text-red-900/opacity-20 text-5xl font-medium text-white/80 ">
        Boost your productivity with Arc
      </div>
      <div className="w-[287px] h-[313px] bg-blue-600 rounded-full blur-[300px]"></div>

      <Image
        src={heroImage}
        className="  -mt-[300px] relative shadow-xl"
        alt=""
      />
    </div>
  );
}

export default Hero;
