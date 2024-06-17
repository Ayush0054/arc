"use client";
import SignInModal from "@/components/auth/sign-in-modal";
import AiFeature from "@/components/landing-page/ai-feature";
import { BentoDemo } from "@/components/landing-page/bento";
import CalendarFeature from "@/components/landing-page/calendar-feature";
import Feature from "@/components/landing-page/feature";
import Feature2 from "@/components/landing-page/feature2";
import FeaturesIntro from "@/components/landing-page/features-intro";
import Footer from "@/components/landing-page/footer";
import Hero from "@/components/landing-page/hero";
import Navbar from "@/components/landing-page/navbar";
import NotesFeature from "@/components/landing-page/notes-feature";
import { BorderBeam } from "@/components/ui/border-beam";
import { useState } from "react";

export default function Home() {
  const [authModal, setAuthModal] = useState(false);
  return (
    <div className=" 2xl:items-center flex flex-col ">
      <img
        src="https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif"
        className="absolute z-2 -top-0 left-10"
      />
      <div className="w-[285px] h-[250px] bg-blue-600 rounded-full blur-[200px]"></div>

      <Navbar setAuthModal={setAuthModal} />
      <Hero />

      <div className=" flex justify-center ">
        <div className="w-[500px] h-[303px] bg-blue-600 rounded-full blur-[300px] mt-60"></div>
      </div>

      <BentoDemo />
      <FeaturesIntro />
      <AiFeature />
      <CalendarFeature />
      <NotesFeature />
      <Footer />

      {authModal && <SignInModal setAuthModal={setAuthModal} />}
    </div>
  );
}
