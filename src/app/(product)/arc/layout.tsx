"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { UserButton } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

interface CreateLayoutProps {
  children: React.ReactNode;
}

function CreateLayout({ children }: CreateLayoutProps) {
  const [userButtonReady, setUserButtonReady] = useState(false);

  useEffect(() => {
    // Set a timeout to simulate the loading of the UserButton component
    const timeoutId = setTimeout(() => {
      setUserButtonReady(true);
    }, 2000); // Set the timeout to 2000ms (2 seconds) for demonstration purposes

    // Clean up the timeout when the component is unmounted
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className=" flex justify-between arc h-full ">
      {/* <Sidebar /> */}
      <div className=" lg:container max-lg:mx-4  w-full ">
        <div className=" flex justify-end gap-5 py-3  px-10  top-0 sticky">
          {/* <ModeToggle /> */}
          <UserButton afterSignOutUrl="/" />
        </div>
        {children}
      </div>
    </div>
  );
}

export default CreateLayout;
