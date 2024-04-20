import { UserButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import { Pen } from "lucide-react";

function Navbar() {
  return (
    <div className=" flex justify-end gap-4 items-center p-2 px-10">
      <Button variant="outline" className=" ">
        Home
      </Button>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

export default Navbar;
