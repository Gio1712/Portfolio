import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ProjectItem } from "../../data/projectdoor";
import RouteLoadingOverlay from "../navigation/RouteLoadingOverlay";
import useHudNavigate from "../../hooks/useHudNavigate";

interface ProjectDoorProps {
  project: ProjectItem;
  index: number;
  activeIndex: number | null;
  onActivate: (index: number | null) => void;
}

export default function ProjectDoor({
  project,
  index,
  activeIndex,
  onActivate,
}: ProjectDoorProps) {
  const navigate = useNavigate();

  const isActive = activeIndex === index;
  const hasActiveDoor = activeIndex !== null;
  const isDimmed = hasActiveDoor && !isActive;

  return (
    <motion.article
      onMouseEnter={() => onActivate(index)}
      onMouseLeave={() => onActivate(null)}
      onFocus={() => onActivate(index)}
      onBlur={() => onActivate(null)}
      onClick={() => {
        console.log("OPEN CATEGORY:", project.categoryId);

        navigate(`/projects/${project.categoryId}`);
      }}
      animate={{
        flex: isActive ? 2.35 : 1,
        opacity: isDimmed ? 0.48 : 1,
        y: isActive ? -6 : 0,
      }}
      transition={{
        flex: {
          type: "spring",
          stiffness: 180,
          damping: 26,
          mass: 0.8,
        },
        opacity: {
          duration: 0.3,
        },
        y: {
          type: "spring",
          stiffness: 260,
          damping: 24,
        },
      }}
      className="
        group
        relative
        min-w-0
        cursor-pointer
        overflow-hidden
        rounded-[28px]
        border
        border-[#E8E9EB]/10
        bg-[#0D0E11]
        outline-none
        transition-colors
        duration-500
        hover:border-[#E8E9EB]/30
        focus-visible:border-[#E8E9EB]/45
      "
      tabIndex={0}
    >
      {/* =========================
          BACKGROUND IMAGE
      ========================= */}
      <motion.img
        src={project.image}
        alt={project.title}
        draggable={false}
        animate={{
          scale: isActive ? 1.05 : 1.2,
          filter: isActive
            ? "blur(4px) saturate(0.9)"
            : "blur(14px) saturate(0.65)",
          opacity: isActive ? 0.78 : 0.42,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          absolute
          inset-0
          h-full
          w-full
          select-none
          object-cover
          will-change-transform
        "
      />

      {/* Glass layer */}
      <motion.div
        animate={{
          backgroundColor: isActive
            ? "rgba(7, 8, 11, 0.34)"
            : "rgba(7, 8, 11, 0.62)",
          backdropFilter: isActive ? "blur(5px)" : "blur(15px)",
        }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0"
      />

      {/* Dark gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/20" />

      {/* HUD grid */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.045]
          transition-opacity
          duration-500
          group-hover:opacity-[0.085]
        "
        style={{
          backgroundImage: `
            linear-gradient(rgba(232,233,235,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232,233,235,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "54px 54px",
        }}
      />

      {/* Diagonal technical pattern */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.035]
          transition-opacity
          duration-500
          group-hover:opacity-[0.075]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              118deg,
              transparent 0%,
              transparent 42%,
              rgba(232,233,235,0.7) 42.4%,
              transparent 42.8%
            )
          `,
          backgroundSize: "190px 190px",
        }}
      />

      {/* Hover radial glow */}
      <motion.div
        animate={{
          opacity: isActive ? 1 : 0,
          scale: isActive ? 1 : 0.82,
        }}
        transition={{
          duration: 0.5,
        }}
        className="
          pointer-events-none
          absolute
          -right-24
          top-[18%]
          size-[420px]
          rounded-full
          bg-[#E8E9EB]/[0.085]
          blur-[90px]
        "
      />

      {/* Top scan beam */}
      <motion.div
        animate={{
          opacity: isActive ? [0, 0.5, 0] : 0,
          y: isActive ? ["-20%", "650%"] : "-20%",
        }}
        transition={{
          duration: 1.8,
          ease: "linear",
          repeat: isActive ? Infinity : 0,
          repeatDelay: 2.2,
        }}
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          z-20
          h-20
          bg-gradient-to-b
          from-transparent
          via-[#E8E9EB]/[0.085]
          to-transparent
        "
      />

      {/* =========================
          CONTENT
      ========================= */}
      <div className="relative z-10 flex h-full min-h-[620px] flex-col justify-between p-6 md:p-7 lg:p-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3">
            <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.32em] text-[#E8E9EB]/45">
              PRJ / {project.number}
            </span>

            <motion.div
              animate={{
                scaleX: isActive ? 1 : 0.38,
              }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                h-px
                flex-1
                origin-left
                bg-gradient-to-r
                from-[#E8E9EB]/45
                to-transparent
              "
            />
          </div>

          <motion.div
            animate={{
              opacity: isActive ? 1 : 0.5,
              y: isActive ? 0 : -4,
            }}
            className="mt-5 flex items-center justify-between gap-4"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#E8E9EB]/55">
              {project.year}
            </span>

            <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#E8E9EB]/30">
              Module / 0{index + 1}
            </span>
          </motion.div>
        </div>

        {/* Center HUD node */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 md:right-7 lg:right-8">
          <motion.div
            animate={{
              scale: isActive ? 1.14 : 0.85,
              opacity: isActive ? 1 : 0.42,
              rotate: isActive ? 90 : 0,
            }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex size-12 items-center justify-center"
          >
            <div className="absolute size-11 rounded-full border border-[#E8E9EB]/15" />

            <div className="absolute size-7 rounded-full border border-[#E8E9EB]/25" />

            <div className="size-2 rounded-full bg-[#E8E9EB] shadow-[0_0_18px_rgba(232,233,235,0.55)]" />

            <div className="absolute -top-1 h-3 w-px bg-[#E8E9EB]/35" />

            <div className="absolute -bottom-1 h-3 w-px bg-[#E8E9EB]/20" />
          </motion.div>
        </div>

        {/* Bottom information */}
        <div className="relative overflow-visible pb-3">
          <motion.div
            animate={{
              y: isActive ? 0 : 12,
            }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.3em] text-[#E8E9EB]/45">
              {project.category}
            </p>

            <motion.h3
              className="
    max-w-[520px]
    font-black
    uppercase
    leading-[0.95]
    tracking-[-0.01em]
    text-[#F1F2F3]
  "
              animate={{
                scale: isActive ? 1 : 1,
              }}
              style={{
                fontSize: isActive
                  ? "clamp(1.8rem, 3.4vw, 3.6rem)"
                  : "clamp(1.2rem, 1.8vw, 2rem)",
              }}
            >
              <span className="block whitespace-nowrap">
                {project.titleLines[0]}
              </span>

              <span className="block whitespace-nowrap">
                {project.titleLines[1]}
              </span>
            </motion.h3>
          </motion.div>

          <motion.div
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 12,
              scale: isActive ? 1 : 0.96,
              pointerEvents: isActive ? "auto" : "none",
            }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-7 overflow-visible"
          >
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/projects/${project.categoryId}`);
              }}
              className="..."
            >
              Open category
              <ArrowUpRight size={15} />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Active border glow */}
      <motion.div
        animate={{
          opacity: isActive ? 1 : 0,
        }}
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-[28px]
          border
          border-[#E8E9EB]/35
          shadow-[inset_0_0_40px_rgba(232,233,235,0.035),0_0_30px_rgba(232,233,235,0.035)]
        "
      />

      {/* Corner markers */}
      <div className="pointer-events-none absolute left-4 top-4 size-4 border-l border-t border-[#E8E9EB]/20" />

      <div className="pointer-events-none absolute right-4 top-4 size-4 border-r border-t border-[#E8E9EB]/20" />

      <div className="pointer-events-none absolute bottom-4 left-4 size-4 border-b border-l border-[#E8E9EB]/20" />

      <div className="pointer-events-none absolute bottom-4 right-4 size-4 border-b border-r border-[#E8E9EB]/20" />
    </motion.article>
  );
}
