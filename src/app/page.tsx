"use client";
import SignInModal from "@/components/auth/sign-in-modal";
import AiFeature from "@/components/landing-page/ai-feature";
import { BentoDemo } from "@/components/landing-page/bento";
import CalendarFeature from "@/components/landing-page/calendar-feature";
import Feature from "@/components/landing-page/feature";
import Feature2 from "@/components/landing-page/feature2";
import Footer from "@/components/landing-page/footer";
import Hero from "@/components/landing-page/hero";
import Navbar from "@/components/landing-page/navbar";
import NotesFeature from "@/components/landing-page/notes-feature";
import { BorderBeam } from "@/components/ui/border-beam";
import { useState } from "react";

export default function Home() {
  const [authModal, setAuthModal] = useState(false);
  return (
    <div className=" ">
      <div className="w-[285px] h-[250px] bg-blue-600 rounded-full blur-[200px]"></div>

      <Navbar setAuthModal={setAuthModal} />
      <Hero />

      <div className=" flex justify-center ">
        <div className="w-[500px] h-[303px] bg-blue-600 rounded-full blur-[300px] mt-60"></div>
      </div>

      <BentoDemo />
      <AiFeature />
      <CalendarFeature />
      <NotesFeature />
      <Footer />

      {authModal && <SignInModal setAuthModal={setAuthModal} />}
    </div>
  );
}
