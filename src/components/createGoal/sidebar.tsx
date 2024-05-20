import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ListCollapse } from "lucide-react";

function Sidebar() {
  const { push } = useRouter();
  const { userId } = useAuth();
  return (
    <div className="w-[300px]   lg:flex hidden h-[100vh] lg:flex-col border-r-2 ">
      <div className=" flex flex-col gap-5     pt-5 items-center  ">
        <div className="border-b-2 w-full text-center ">
          <a
            className="font-bold text-3xl  font-nunito "
            onClick={() => {
              push(`/feed`);
            }}
          >
            ARC
          </a>
        </div>

        <a
          onClick={() => {
            push(`/profile/${userId}`);
          }}
        >
          Your Profile
        </a>

        <Collapsible className=" w-full ">
          <CollapsibleTrigger className=" w-full">
            {" "}
            <h1 className=" text-gray-600 text-xl  justify-center  font-semibold my-5 flex items-center gap-3">
              Your Tasks <ListCollapse className="h-4 w-4" />
            </h1>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 flex flex-col px-2">
            <a
              className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm text-center"
              href=""
            >
              learn rust
            </a>
            <a
              className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm text-center"
              href=""
            >
              learn rust
            </a>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}

export default Sidebar;
