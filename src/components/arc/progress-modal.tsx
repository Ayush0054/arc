import React from "react";
import { Card, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

function ProgressModal() {
  return (
    <div
      className="fixed inset-0 bg-gray-100 flex justify-center bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="mt-8 border shadow-md h-[800px] lg:w-[800px] flex flex-col  bg-white rounded-xl mx-8 gap-3 border-gray-300">
        <div className="flex items-start justify-end mx-4 mt-4">
          <div
            //    onClick={onClose}
            className="cursor-pointer"
          >
            <X />
          </div>
        </div>
        <div className=" items-center flex flex-col m-4 ">
          <ScrollArea className=" h-[600px]">
            <Card className=" lg:w-[600px] p-5 mt-4 ">
              <h1 className=" text-end">4 jan 2024</h1>
              <CardTitle>Todo title</CardTitle>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptatum, eveniet incidunt exceptur Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Voluptatum, eveniet incidunt
              exceptur
            </Card>
            <Card className=" lg:w-[600px] p-5 mt-4 ">
              <h1 className=" text-end">4 jan 2024</h1>
              <CardTitle>Todo title</CardTitle>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptatum, eveniet incidunt exceptur Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Voluptatum, eveniet incidunt
              exceptur
            </Card>
            <Card className=" lg:w-[600px] p-5  mt-4  ">
              <h1 className=" text-end">4 jan 2024</h1>
              <CardTitle>Todo title</CardTitle>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptatum, eveniet incidunt exceptur Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Voluptatum, eveniet incidunt
              exceptur
            </Card>
            <Card className=" lg:w-[600px] p-5 mt-4   ">
              <h1 className=" text-end">4 jan 2024</h1>
              <CardTitle>Todo title</CardTitle>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptatum, eveniet incidunt exceptur Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Voluptatum, eveniet incidunt
              exceptur
            </Card>
            <Card className=" lg:w-[600px] p-5 mt-4  ">
              <h1 className=" text-end">4 jan 2024</h1>
              <CardTitle>Todo title</CardTitle>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptatum, eveniet incidunt exceptur Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Voluptatum, eveniet incidunt
              exceptur
            </Card>
          </ScrollArea>
        </div>
        <div className=" flex items-center mt-auto gap-3 m-4">
          <Input />
          <Button className="lg:block hidden">Add Progress</Button>
          <button className="lg:hidden block">
            {" "}
            <Check />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProgressModal;
