import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

function Navbar() {
  return (
    <div className=" flex justify-evenly mt-5 top-1 sticky z-10 items-center">
      <h1 className=" text-5xl font-semibold">Arc</h1>
      <div className=" flex justify-evenly gap-5 text-gray-500">
        <Link href="/">Home</Link>
        <Link href="/">Explore</Link>
        <Link href="/">Notifications</Link>
        <Link href="/">Messages</Link>
        <Link href="/">Create</Link>
      </div>
      <div className=" flex gap-4 ">
        <Button className=" text-green-500 bg-white hover:bg-white">
          Sign in
        </Button>
        <Button className=" text-white">Get Started</Button>
      </div>
    </div>
  );
}

export default Navbar;
