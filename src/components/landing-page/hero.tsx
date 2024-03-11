import React from "react";
import heroImage from "@/assets/hero.png";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";

function Hero() {
  return (
    <div className=" mt-10 flex  justify-between 2xl:justify-center">
      <div className=" w-[768px] ml-20 m-10 flex flex-col ">
        <Badge className="  shadow-md flex gap-2 w-[250px] text-lg p-1 mb-4 rounded-lg bg-green-100 hover:bg-green-100  text-green-500">
          <Badge className=" border-gray-300 p-2 rounded-lg bg-white hover:bg-white text-green-500">
            NEW
          </Badge>
          Introducing AI{" "}
        </Badge>
        <h1 className=" text-gray-900 text-4xl font-semibold">
          Set goals ,track progress, and get insights to improve your life
        </h1>
        <Card className="flex justify-center mt-16 shadow-green-100 shadow-lg p-1 w-[400px] ">
          <input
            type="text"
            placeholder="Your Email"
            className=" outline-none border-none w-full p-1 "
          />
          <Button className=" text-white">Get Started</Button>
        </Card>
      </div>
      <Image
        className="shadow-green-100 shadow-2xl hover:blur-none blur-sm rounded-2xl"
        src={heroImage}
        alt=""
      />
    </div>
  );
}

export default Hero;
