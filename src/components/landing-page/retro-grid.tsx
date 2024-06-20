import { cn } from "@/app/lib/utils";

export default function RetroGrid({ className }: { className?: string }) {
  return (
    <template>
      <div className="pointer-events-none absolute h-full w-full overflow-hidden opacity-50 [perspective:200px]">
        <div className="absolute inset-0 [transform:rotateX(35deg)]">
          <div className="animate-grid [background-image:linear-gradient(to_right,theme(colors.input)_1px,transparent_0),linear-gradient(to_bottom,theme(colors.input)_1px,transparent_0)] [background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent to-90% dark:from-black" />
      </div>
    </template>
  );
}
