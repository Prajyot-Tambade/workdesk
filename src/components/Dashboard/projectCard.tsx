import React from "react";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { BadgeIndianRupee, Calendar } from "lucide-react";
import Link from "next/link";
import { motion, Transition } from "motion/react"

export type ProjectCardType = {
  id: number;
  projectLogo?: string;
  description?: string;
  status: string;
  title: string;
  tags: string[];
  deadline: number;
  budget?: number;
};

const ProjectCard = ({
  projectLogo,
  title,
  description,
  status,
  tags,
  deadline,
  budget,
}: ProjectCardType) => {
  const spring: Transition = {
    type: "spring",
    damping: 20,
    stiffness: 200,
}
  return (
    <motion.div className="w-full h-full p-4 bg-neutral-950 hover:bg-neutral-900 hover:ring-1 ring-neutral-800 rounded-xl shadow-[2px_4px_3px] shadow-neutral-800/30" layout transition={spring}>
      <Link
        href="/"
        className="space-y-2"
      >
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={projectLogo} />
            <AvatarFallback className="size-8 flex items-center justify-center bg-accent">
              {title[0]}
            </AvatarFallback>
          </Avatar>
          <h3>{title}</h3>
          <div className="ml-auto">
            <span className="px-2 py-1 text-xs font-semibold bg-green-500/30 text-green-500 rounded-md">
              {status}
            </span>
          </div>
        </div>
        {}
        <p className="text-muted-foreground mt-2">{description}</p>
        <div className="flex gap-2 text-xs">
          {tags.map((tag) => (
            <span
              key={tag}
              className="ring-1 ring-neutral-700 text-muted-foreground font-semibold rounded-full px-2 py-1"
            >
              {title}
            </span>
          ))}
        </div>
        <div className="text-muted-foreground text-xs space-y-2">
          <div className="flex items-center gap-1">
            <BadgeIndianRupee size={15} />₹{budget}
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={15} />
            {new Date(deadline).toLocaleDateString("en-IN")}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
