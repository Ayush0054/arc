import React from "react";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

function ArcPost() {
  return (
    <div className=" w-[768px] m-6 ">
      <Card className="p-6">
        <CardTitle>learn arc</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          explicabo eum quae consequatur mo
        </CardDescription>
        <h1>Time</h1>
        <h1>Categories badges</h1>
        <h1 className=" mt-6 mb-3">Todos</h1>
        <div className="flex items-center space-x-2">
          {/* <Checkbox id="terms" /> */}
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions...{" "}
            <span className=" text-blue-500">read more</span>
          </label>
        </div>
        <div className=" flex gap-3 mt-4">
          <Button>UpVote</Button>
          <Button variant="secondary">Share</Button>
        </div>
      </Card>
    </div>
  );
}

export default ArcPost;
