import React from "react";
import { FaCheckSquare } from "react-icons/fa";
import { Card } from "../ui/card";
function Feature2() {
  return (
    <div className=" mt-24 container flex flex-col items-center py-8  ">
      {" "}
      <h1 className=" text-4xl font-semibold text-center">
        Take the next step without any hassle & get results fast
      </h1>
      <div className=" mt-16 lg:flex lg:justify-center gap-16">
        <div className=" flex flex-col gap-12">
          <FeatureCard />
          <FeatureCard2 />
        </div>
        <div className=" flex flex-col gap-12">
          <FeatureCard2 />
          <FeatureCard />
        </div>
      </div>
    </div>
  );
}

export default Feature2;

function FeatureCard() {
  return (
    <Card className=" p-8 w-[450px] text-start shadow-md">
      <FaCheckSquare size={44} className="mb-20" />
      <h1 className=" text-2xl font-semibold  mb-8">Predictive Insights</h1>
      <h1 className=" text-lg text-gray-700 ">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend nullam
        consectetur placerat pellentesque ut massa volutpat at. Diam pretium
        orci dui sagittis.
      </h1>
    </Card>
  );
}
function FeatureCard2() {
  return (
    <div className="relative max-lg:mt-8">
      <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-sky-300 via-rose-300 to-lime-300 opacity-75 blur"></div>
      <Card className="relative p-8 w-[450px] text-start shadow-md">
        <FaCheckSquare size={44} className="mb-20" />
        <h1 className=" text-2xl font-semibold  mb-8">Predictive Insights</h1>
        <h1 className=" text-lg text-gray-700 mb-8 ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend
          nullam consectetur placerat pellentesque ut massa volutpat at. Diam
          pretium orci dui sagittis.
        </h1>
        <h1 className=" text-lg text-gray-700 ">
          Eleifend nullam consectetur placerat pelle tesque ut massa volutpat
          bonur los.
        </h1>
      </Card>
    </div>
  );
}
