"use client";

import { cn } from "@/app/lib/utils";
import BackgroundBricks from "../ui/background-bricks";
import GridPattern from "../ui/grid-pattern";
import RetroGrid from "./retro-grid";

function FeaturesIntro() {
  return (
    <div>
      <div className="relative  mt-32 ] ">
        <div className="pointer-events-none absolute h-[150px] w-full overflow-hidden opacity-50 [perspective:200px]">
          <div className="absolute inset-0 [transform:rotateX(35deg)]">
            <GridPattern
              width={100}
              height={100}
              //   x={-1}
              //   y={-1}
              className={cn(
                "animate-grid",

                "[background-repeat:repeat] [background-size:60px_60px] [height:300vh]  [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]",

                // Light Styles
                "[background-image:linear-gradient(to_right,rgba(0,0,0,0.3)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.3)_1px,transparent_0)]",

                // Dark styles
                "dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)]"
              )}
            />
          </div>
        </div>

        <span className="pointer-events-none z-10 lg:px-20 px-4 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center lg:text-7xl text-4xl font-semibold leading-none tracking-tighter text-transparent">
          Features
        </span>
      </div>
    </div>
  );
}

export default FeaturesIntro;
