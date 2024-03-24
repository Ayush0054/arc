import React from "react";
import { Button } from "../ui/button";
import img from "@/assets/feature2.png";
import Image from "next/image";
function Feature() {
  return (
    <div className=" mt-24 container flex flex-col items-center py-8  ">
      <div className=" w-[586px] flex flex-col items-center  ">
        <h1 className=" text-4xl font-semibold text-center">
          Build your solid team with the perfect time management
        </h1>
        <div className=" relative mt-16">
          <div className=" absolute -inset-2 bg-gradient-to-r from-sky-300 via-rose-300 to-lime-300 blur-xl   "></div>
          <h1 className=" relative text-base text-gray-600  text-center font-medium   ">
            Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec,
            proin faucibus nibh et sagittis a. Lacinia purus ac amet.
          </h1>
        </div>
        <Button className=" mt-16">Add first Task</Button>
      </div>
      <div className=" mt-8">
        <Image
          className=" border-r-2 rounded-2xl shadow-lg  border-b-2"
          src={img}
          alt=""
        />
      </div>
    </div>
  );
}

export default Feature;
