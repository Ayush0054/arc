import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
function ArcPost({ arc }: { arc: any }) {
  const router = useRouter();
  return (
    <div>
      <div className=" group relative  ">
        <Card className="p-6 w-[400px]  shadow-lg font-nunito rounded-[16px] transition duration-300 ease-in-out group-hover:blur-sm  ">
          <div className=" flex justify-between items-center">
            <CardTitle className="  mb-4 text-2xl">{arc?.title}</CardTitle>
            <div>
              {arc?.isCompleted === false ? (
                <Badge variant="destructive">Not Done</Badge>
              ) : (
                <Badge>Done</Badge>
              )}
            </div>
          </div>
          <CardDescription className=" text-base text-gray-600">
            {arc?.description}
          </CardDescription>

          <Badge variant="outline" className=" rounded-[8px] my-4 ">
            {arc?.type}
          </Badge>

          {arc?.todo[0]?.todo && (
            <div className="flex items-center space-x-2 shadow-inner p-4 bg-gray-950">
              <label
                htmlFor="terms"
                className="text-base font-medium text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                1. {arc?.todo[0]?.todo}
              </label>
            </div>
          )}
        </Card>
        <Button
          onClick={() => router.push(`/arc/${arc.id}`)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out"
        >
          View
        </Button>
      </div>
    </div>
  );
}

export default ArcPost;
