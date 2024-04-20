"use client";
import Sidebar from "@/components/createGoal/sidebar";
import Navbar from "@/components/feed/navbar";
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
    <div className=" flex justify-between container">
      <div className=" lg:w-[100vw] w-full ">
        <Navbar />
        {children}
      </div>
    </div>
  );
}

export default CreateLayout;
