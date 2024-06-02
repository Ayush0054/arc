import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface NavbarProps {
  setAuthModal: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setAuthModal }) => {
  const { isSignedIn } = useUser();
  const router = useRouter();

  return (
    <div className=" -mt-[250px] shadow-sm py-2">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-semibold">Arc</h1>

        <div className="flex gap-4">
          <Button
            onClick={() =>
              isSignedIn ? router.push("/home") : setAuthModal(true)
            }
            className="bg-[#0e1d24] hover:bg-[#0e1d24] rounded-2xl"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
