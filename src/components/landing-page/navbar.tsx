import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import logo from "@/assets/Arc.svg";
import Image from "next/image";
interface NavbarProps {
  setAuthModal: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setAuthModal }) => {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  return (
    <div className=" -mt-[250px] shadow-sm py-2 lg:mx-20 mx-4">
      <motion.div
        initial="hidden"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.div
          className="text-center font-display text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <div className="flex justify-between items-center">
            <div className=" flex gap-2 items-center">
              <Image src={logo} className=" h-10 w-16" alt="" />
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() =>
                  isSignedIn ? router.push("/home") : setAuthModal(true)
                }
                className="bg-[#0e1d24] hover:bg-[#0e1d24] rounded-2xl text-white"
              >
                Get Started
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Navbar;
