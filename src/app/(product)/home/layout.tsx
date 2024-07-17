"use client";

import { UserButton } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

interface CreateLayoutProps {
  children: React.ReactNode;
}

function CreateLayout({ children }: CreateLayoutProps) {
  const [userButtonReady, setUserButtonReady] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setUserButtonReady(true);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className=" flex justify-between">
      <div className=" container lg:w-[100vw] w-full ">
        <div className=" flex justify-end p-2 px-10">
          <UserButton afterSignOutUrl="/" />
        </div>
        {children}
      </div>
    </div>
  );
}

export default CreateLayout;
