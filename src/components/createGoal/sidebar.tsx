import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";

function Sidebar() {
  const { push } = useRouter();
  const { userId } = useAuth();
  return (
    <div className="w-[700px] border-r-2 items-end lg:flex hidden lg:flex-col">
      <div className=" flex flex-col gap-5   w-[200px] h-[100vh] pt-5   ">
        <div className=" flex flex-col gap-5 ">
          <a
            className="font-bold text-3xl text-center"
            onClick={() => {
              push(`/feed`);
            }}
          >
            ARC
          </a>
        </div>
        <div className=" flex flex-col gap-16 items-center ">
          <button
            className=" after:bg-green-200 text-gray-500 hover:text-gray-400 flex gap-3 items-center mx-5  "
            onClick={() => {
              push(`/profile/${userId}`);
            }}
          >
            Your Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
