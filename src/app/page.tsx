import Feature from "@/components/landing-page/feature";
import Feature2 from "@/components/landing-page/feature2";
import Hero from "@/components/landing-page/hero";
import Navbar from "@/components/landing-page/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Feature />
      <Feature2 />
    </div>
  );
}
