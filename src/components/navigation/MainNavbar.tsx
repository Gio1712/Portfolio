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
                  ${
                    isActive
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

      {/* Contact bên phải */}
      <div className="flex flex-1 justify-end">
        <button
          type="button"
          onClick={() => navigateTo("contact")}
          className="
            group
            flex
            items-center
            gap-1
            text-sm
            font-medium
            uppercase
            tracking-wider
            text-[#E8E9EB]
            transition-opacity
            duration-300
            hover:opacity-65
            lg:text-[1.15rem]
          "
        >
          Contact
          <ArrowUpRight
            size={17}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
            "
          />
        </button>
      </div>
    </motion.nav>
  );
}
