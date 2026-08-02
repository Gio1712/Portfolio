import { motion, useMotionValueEvent, useScroll } from "framer-motion";

import { useState } from "react";

interface NavigationItem {
  label: string;
  sectionId: string;
}

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: "HOME",
    sectionId: "home",
  },
  {
    label: "MARQUEE",
    sectionId: "marquee",
  },
  {
    label: "ABOUT",
    sectionId: "about",
  },
  {
    label: "SERVICES",
    sectionId: "services",
  },
  {
    label: "PROJECTS",
    sectionId: "projects",
  },
  {
    label: "CONTACT",
    sectionId: "contact",
  },
];
interface SectionNavigationProps {
  onNavigate: (sectionId: string) => void;
}

export default function SectionNavigation({
  onNavigate,
}: SectionNavigationProps) {
  const { scrollY } = useScroll();

  const [showSideNavigation, setShowSideNavigation] = useState(false);

  useMotionValueEvent(scrollY, "change", (currentScrollY) => {
    /*
     * Menu dọc xuất hiện sau khi rời khỏi Hero.
     *
     * Có thể tăng lên 700–900 nếu Hero cao hơn.
     */
    setShowSideNavigation(currentScrollY > window.innerHeight * 0.72);
  });

  return (
    <>
      {/* =========================
          NAVIGATION DỌC CỐ ĐỊNH
      ========================= */}
      <motion.nav
        initial={false}
        animate={{
          opacity: showSideNavigation ? 1 : 0,
          x: showSideNavigation ? 0 : -24,
          pointerEvents: showSideNavigation ? "auto" : "none",
        }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
  fixed
  right-1
  top-[44%]
  z-[100]
  hidden
  -translate-y-1/2
  flex-col
  items-center
  gap-2
  md:flex
"
      >
        {/* HUD line trên */}
        <div className="mb-2 h-10 w-px bg-gradient-to-b from-transparent to-[#E8E9EB]/25" />

        {NAVIGATION_ITEMS.map((item, index) => (
          <motion.button
            key={item.sectionId}
            type="button"
            onClick={() => onNavigate(item.sectionId)}
            whileHover={{
              x: 4,
            }}
            whileTap={{
              scale: 0.94,
            }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 24,
            }}
            className="group relative flex size-9 items-center justify-center rounded-full"
            aria-label={`Đi đến ${item.label}`}
          >
            {/* Vòng HUD ngoài */}
            <span
              className="
  absolute
  size-7
  rounded-full
  border
  border-[#E8E9EB]/12
  transition-all
  duration-300
  group-hover:scale-110
  group-hover:border-[#E8E9EB]/40
"
            />

            {/* Node */}
            <span
              className="
  relative
  z-10
  size-1.5
  rounded-full
  bg-[#E8E9EB]/55
  transition-all
  duration-300
  group-hover:size-2
  group-hover:bg-[#E8E9EB]
  group-hover:shadow-[0_0_12px_rgba(232,233,235,0.5)]
"
            />

            {/* Tooltip */}
            <span
              className="
    pointer-events-none
    absolute
    right-11
    whitespace-nowrap
    rounded-full
    border
    border-[#E8E9EB]/10
    bg-black/80
    px-3
    py-1.5
    text-[10px]
    font-bold
    uppercase
    tracking-[0.24em]
    text-[#E8E9EB]/70
    opacity-0
    backdrop-blur-md
    transition-all
    duration-300
    group-hover:-translate-x-1
    group-hover:opacity-100
  "
            >
              0{index + 1} / {item.label}
            </span>
          </motion.button>
        ))}

        {/* HUD line dưới */}
        <div className="mt-2 h-9 w-px bg-gradient-to-b from-[#E8E9EB]/25 to-transparent" />
      </motion.nav>
    </>
  );
}
