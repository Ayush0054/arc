"use client";
import SignInModal from "@/components/auth/sign-in-modal";
import Feature from "@/components/landing-page/feature";
import Feature2 from "@/components/landing-page/feature2";
import Footer from "@/components/landing-page/footer";
import Hero from "@/components/landing-page/hero";
import Navbar from "@/components/landing-page/navbar";
import { useState } from "react";

export default function Home() {
  const [authModal, setAuthModal] = useState(false);
  return (
    <div className=" mx-20">
      <div className="w-[285px] h-[250px] bg-blue-600 rounded-full blur-[200px]"></div>

      <Navbar setAuthModal={setAuthModal} />
      <Hero />
      <Footer />
      {/* <Feature />
      <Feature2 /> */}
      {authModal && <SignInModal setAuthModal={setAuthModal} />}
    </div>
  );
}
