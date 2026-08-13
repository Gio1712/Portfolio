import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface MainNavbarProps {
  onNavigate: (sectionId: string) => void;
}

const NAVIGATION_ITEMS = [
  {
    label: "Home",
    sectionId: "home",
  },
  {
    label: "About",
    sectionId: "about",
  },
  {
    label: "Services",
    sectionId: "services",
  },
  {
    label: "Projects",
    sectionId: "projects",
  },
];

export default function MainNavbar({ onNavigate }: MainNavbarProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const sectionIds = ["home", "about", "services", "projects", "contact"];

    const updateActiveSection = () => {
      setIsVisible(window.scrollY < window.innerHeight * 0.62);
      const checkPosition = window.scrollY + window.innerHeight * 0.35;

      let currentSection = "home";

      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);

        if (!section) continue;

        if (checkPosition >= section.offsetTop) {
          currentSection = sectionId;
        }
      }

      setActiveSection(currentSection);
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, []);

  const navigateTo = (sectionId: string) => {
    setActiveSection(sectionId);
    onNavigate(sectionId);
  };

  return (
    <motion.nav
      initial={{
        opacity: 0,
        y: -18,
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -24,
        pointerEvents: isVisible ? "auto" : "none",
      }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        fixed
        inset-x-0
        top-0
        z-[200]
        hidden
        h-[88px]
        items-center
        px-6
        md:flex
        md:px-10
      "
    >
      {/* Cân khoảng trống bên trái */}
      <div className="flex-1" />

      {/* Menu giữa */}
      <div className="flex items-center justify-center gap-4 lg:gap-8">
        {NAVIGATION_ITEMS.map((item) => {
          const isActive = activeSection === item.sectionId;

          return (
            <button
              key={item.sectionId}
              type="button"
              onClick={() => navigateTo(item.sectionId)}
              className={`
                  relative
                  rounded-full
                  border
                  px-4
                  py-1.5
                  text-xs
                  font-medium
                  uppercase
                  tracking-wider
                  transition-all
                  duration-300
                  lg:text-base
                  ${isActive
                  ? `
                        border-[#E8E9EB]/80
                        bg-[#E8E9EB]/[0.04]
                        text-[#E8E9EB]
                      `
                  : `
                        border-transparent
                        text-[#E8E9EB]/75
                        hover:text-[#E8E9EB]
                      `
                }
                `}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* CV */}
      <div className="flex flex-1 justify-end">
        <a
          href="/CV/buiminhdatCV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="
      group
      relative
      flex
      items-center
      gap-3
      overflow-hidden
      rounded-full
      border
      border-[#E8E9EB]/20
      bg-[#E8E9EB]/[0.035]
      px-5
      py-2.5
      text-xs
      font-bold
      uppercase
      tracking-[0.16em]
      text-[#E8E9EB]
      backdrop-blur-md
      transition-all
      duration-300
      hover:border-[#E8E9EB]/55
      hover:bg-[#E8E9EB]/[0.08]
      hover:shadow-[0_0_24px_rgba(232,233,235,0.08)]
      active:scale-[0.97]
      lg:px-6
      lg:py-3
      lg:text-sm
    "
        >
          <span
            className="
        pointer-events-none
        absolute
        inset-y-0
        -left-1/2
        w-1/2
        rotate-12
        bg-gradient-to-r
        from-transparent
        via-white/[0.09]
        to-transparent
        transition-transform
        duration-700
        group-hover:translate-x-[280%]
      "
          />

          <span className="relative z-10">
            Open CV
          </span>

          <span
            className="
        relative
        z-10
        flex
        size-6
        items-center
        justify-center
      "
          >
            <span
              className="
          relative
          flex
          size-2.5
          items-center
          justify-center
          rounded-full
          bg-[#E8E9EB]
          shadow-[0_0_10px_rgba(232,233,235,0.55)]
          transition-all
          duration-300
          group-hover:scale-125
          group-hover:shadow-[0_0_16px_rgba(232,233,235,0.8)]
        "
            >
              <span className="absolute size-5 rounded-full border border-[#E8E9EB]/20 transition-all duration-300 group-hover:border-[#E8E9EB]/40" />
            </span>
          </span>
        </a>
      </div>
    </motion.nav>
  );
}
