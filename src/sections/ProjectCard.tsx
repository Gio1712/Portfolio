import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LiveProjectButton from "../components/buttons/LiveProjectButton";
import type { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  totalCards: number;
}

export default function ProjectCard({
  project,
  index,
  totalCards,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const topOffset = index * 28;

  return (
    <div
      ref={cardRef}
      className="sticky top-24 md:top-32 h-[85vh]"
      style={{ top: `${96 + topOffset}px` }}
    >
      <motion.div
        style={{ scale }}
        className="h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#E8E9EB] bg-[#0A0A0A] p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              className="font-black text-[#E8E9EB] leading-none"
              style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
            >
              {project.number}
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-[#E8E9EB] uppercase tracking-widest text-xs sm:text-sm opacity-60">
                {project.category}
              </span>
              <h3 className="text-[#E8E9EB] font-medium uppercase text-lg sm:text-2xl md:text-3xl">
                {project.name}
              </h3>
            </div>
          </div>
          <LiveProjectButton />
        </div>

        <div className="flex-1 flex gap-3">
          <div className="w-[40%] flex flex-col gap-3">
            <img
              src={project.col1Image1}
              alt={`${project.name} preview 1`}
              loading="lazy"
              className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: "clamp(130px, 16vw, 230px)" }}
            />
            <img
              src={project.col1Image2}
              alt={`${project.name} preview 2`}
              loading="lazy"
              className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] flex-1"
              style={{ height: "clamp(160px, 22vw, 340px)" }}
            />
          </div>
          <div className="w-[60%]">
            <img
              src={project.col2Image}
              alt={`${project.name} preview 3`}
              loading="lazy"
              className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
