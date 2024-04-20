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
    <div className="w-[300px]  items-end lg:flex hidden lg:flex-col">
      <div className=" flex flex-col gap-5   w-[200px] h-[100vh] pt-5 items-center   ">
        <a
          className="font-bold text-3xl "
          onClick={() => {
            push(`/feed`);
          }}
        >
          ARC
        </a>

        <a
          onClick={() => {
            push(`/profile/${userId}`);
          }}
        >
          Your Profile
        </a>

        <Collapsible>
          <CollapsibleTrigger>
            {" "}
            <h1 className=" text-gray-600 text-xl border-b-2 font-semibold my-5 flex items-center gap-3">
              Your Tasks <ListCollapse className="h-4 w-4" />
            </h1>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 flex flex-col">
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
