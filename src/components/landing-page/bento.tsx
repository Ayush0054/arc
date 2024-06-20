import { Calendar } from "@/components/ui/calendar";

import { motion } from "framer-motion";
import img from "@/assets/notes-full.png";
import { CalendarIcon, FileTextIcon, InputIcon } from "@radix-ui/react-icons";
import { Code, Notebook, Share2Icon, Workflow } from "lucide-react";
import Marquee from "../ui/marquee";
import { BentoCard, BentoGrid } from "../ui/bento-grid";
import { cn } from "@/app/lib/utils";
import { AnimatedBeamMultipleOutputDemo } from "./animated-beam-output";
import { BorderBeam } from "../ui/border-beam";
import Image from "next/image";
import { Textarea } from "../ui/textarea";

const files = [
  {
    name: "Workout",
    body: "workout for loosing weight and be fit.",
  },
  {
    name: "Syllabus Completion",
    body: "Monday i have physics theory, i have to finish syllabus before that.",
  },
  {
    name: "Project",
    body: "i have to commplete my opencv project , to progress my image recoginiton learning.",
  },
  {
    name: "Workout",
    body: "workout for loosing weight and be fit.",
  },
  {
    name: "Project",
    body: "i have to commplete my opencv project , to progress my image recoginiton learning.",
  },
];

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

let notifications = [
  {
    name: "Payment received",
    description: "Magic UI",
    time: "15m ago",

    icon: "💸",
    color: "#00C9A7",
  },
  {
    name: "User signed up",
    description: "Magic UI",
    time: "10m ago",
    icon: "👤",
    color: "#FFB800",
  },
  {
    name: "New message",
    description: "Magic UI",
    time: "5m ago",
    icon: "💬",
    color: "#FF3D71",
  },
  {
    name: "New event",
    description: "Magic UI",
    time: "2m ago",
    icon: "🗞️",
    color: "#1E86FF",
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] transform cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

const features = [
  {
    Icon: Code,
    name: "Accountability",
    description: "Fix your work schedule with arc",
    href: "/",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white ">
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: Notebook,
    name: "Notes creation",
    description: "Creates notes in Notion like editor",
    href: "/",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <Image
        src={img}
        className="absolute right-10 top-10 w-[70%]  origin-top translate-x-0 border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:-translate-x-10"
        alt=""
      />
      // <Textarea className="absolute right-10 top-10 w-[70%]   origin-top translate-x-0 border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:-translate-x-10" />
    ),
  },
  {
    Icon: Workflow,
    name: "Working",
    description: "create tasks from your goal.",
    href: "/",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute right-2 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Reminder",
    description: "Use the Google calendar to set the Reminder.",
    className: "col-span-3 lg:col-span-1",
    href: "/",
    cta: "Learn more",
    background: (
      <Calendar
        mode="single"
        selected={new Date(2022, 4, 11, 0, 0, 0)}
        className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
      />
    ),
  },
];
const FADE_DOWN_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
};
export function BentoDemo() {
  return (
    <div className=" flex justify-center lg:mx-20 mx-4 -mt-[400px]">
      <motion.div
        initial="hidden"
        // className="lg:mx-20 mx-4"
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
          className="flex justify-center  "
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <div>
            <h1 className=" lg:text-5xl text-2xl font-semibold font-sans text-center ">
              Quick Overview
            </h1>
            <BentoGrid className="  lg:w-[1000px]  mt-12 ">
              {features.map((feature, idx) => (
                <BentoCard key={idx} {...feature} />
              ))}
              {/* <BorderBeam size={50} duration={12} delay={9} /> */}
            </BentoGrid>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
