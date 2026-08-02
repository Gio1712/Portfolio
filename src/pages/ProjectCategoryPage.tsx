import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { Navigate, useParams } from "react-router-dom";

import { PROJECT_CATEGORIES } from "../data/projects/index";

import RouteLoadingOverlay from "../components/navigation/RouteLoadingOverlay";
import useHudNavigate from "../hooks/useHudNavigate";

export default function ProjectCategoryPage() {
  const { categoryId } = useParams();
  const { hudNavigate, isRouteLoading } = useHudNavigate();

  const category = PROJECT_CATEGORIES.find((item) => item.id === categoryId);

  const isMotionCategory = category?.id === "motion-graphics";

  const closeCategory = () => {
    hudNavigate("/", {
      state: {
        scrollTo: "projects",
      },
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      event.preventDefault();
      closeCategory();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!category) {
    return (
      <Navigate
        to="/"
        replace
        state={{
          scrollTo: "projects",
        }}
      />
    );
  }

  return (
    <motion.main
      initial={{
        opacity: 0,
        scale: 0.94,
        y: 24,
        filter: "blur(10px)",
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      exit={{
        opacity: 0,
        scale: 0.96,
        y: 16,
        filter: "blur(7px)",
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#080808]
        px-5
        py-8
        text-[#E8E9EB]
        md:px-10
      "
    >
      {/* HUD background */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(232,233,235,0.35) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(232,233,235,0.35) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "72px 72px",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(232,233,235,0.05), transparent 48%)",
          }}
        />
      </div>

      {/* Close */}
      <button
        type="button"
        onClick={closeCategory}
        aria-label="Close category"
        className="
          group
          fixed
          right-6
          top-6
          z-50
          flex
          items-center
          gap-2
          px-1
          py-1
          text-[#E8E9EB]/60
          transition-colors
          duration-300
          hover:text-[#E8E9EB]
          md:right-8
          md:top-8
        "
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.28em] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Close
        </span>

        <span className="relative flex size-9 items-center justify-center">
          <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-[#E8E9EB]/40 transition-all duration-300 group-hover:h-2.5 group-hover:w-2.5" />
          <span className="absolute right-0 top-0 h-2 w-2 border-r border-t border-[#E8E9EB]/40 transition-all duration-300 group-hover:h-2.5 group-hover:w-2.5" />
          <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#E8E9EB]/40 transition-all duration-300 group-hover:h-2.5 group-hover:w-2.5" />
          <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-[#E8E9EB]/40 transition-all duration-300 group-hover:h-2.5 group-hover:w-2.5" />

          <X
            size={18}
            className="transition-transform duration-300 group-hover:rotate-90"
          />
        </span>
      </button>

      <div className="relative z-10 mx-auto max-w-[1900px]">
        {/* Category heading */}
        <header
          className="
            mb-12
            mt-16
            grid
            gap-8
            md:grid-cols-[1fr_440px]
            md:items-end
          "
        >
          <div>
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.32em]
                text-[#E8E9EB]/35
              "
            >
              Project category / {category.id}
            </p>

            <h1
              className="
                mt-5
                font-black
                uppercase
                leading-[0.95]
                tracking-[-0.01em]
                text-[#F4F5F6]
              "
              style={{
                fontSize: "clamp(2.6rem, 7vw, 6.5rem)",
              }}
            >
              {category.title}
            </h1>
          </div>

          <p
            className="
              max-w-xl
              font-light
              leading-[1.8]
              text-[#E8E9EB]/50
            "
          >
            {category.subtitle}
          </p>
        </header>

        {category.projects.length === 0 ? (
          <div className="flex min-h-[48vh] items-center justify-center text-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#E8E9EB]/30">
                Module currently empty
              </p>

              <h2
                className="mt-4 font-black uppercase text-[#E8E9EB]/70"
                style={{
                  fontSize: "clamp(2rem, 5vw, 5rem)",
                }}
              >
                Coming soon
              </h2>
            </div>
          </div>
        ) : (
          <section
            className={
              isMotionCategory
                ? `
                    grid
                    grid-cols-1
                    gap-4
                    sm:grid-cols-2
                    lg:grid-cols-6
                    lg:auto-rows-auto
                  `
                : `
                    columns-1
                    gap-4
                    sm:columns-2
                    lg:columns-3
                    xl:columns-4
                  `
            }
          >
            {category.projects.map((project, index) => {
              const previewImage =
                project.groups[0]?.images[0]?.src || project.thumbnail;

              return (
                <motion.button
                  key={project.id}
                  type="button"
                  onClick={() => {
                    hudNavigate(`/projects/${category.id}/${project.id}`);
                  }}
                  initial={{
                    opacity: 0,
                    y: 28,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.08 + index * 0.045,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`
  group
  relative
  block
  w-full
  cursor-pointer
  overflow-hidden
  rounded-[22px]
  bg-[#0D0E11]
  text-left

  ${
    category.id === "motion-graphics"
      ? project.motion?.ratio === "16:9"
        ? "aspect-video"
        : project.motion?.ratio === "9:16"
          ? "aspect-[9/16]"
          : "aspect-square"
      : "mb-4 break-inside-avoid"
  }
`}
                >
                  {project.motion ? (
                    <video
                      src={project.motion.preview}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={project.title}
                      className="
      absolute
      inset-0
      h-full
      w-full
      object-cover
      transition-all
      duration-700
      group-hover:scale-[1.025]
      group-hover:brightness-90
    "
                    />
                  ) : (
                    <img
                      src={previewImage}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="
      block
      h-auto
      w-full
      object-contain
      transition-all
      duration-700
      group-hover:scale-[1.025]
      group-hover:brightness-75
    "
                    />
                  )}

                  <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/95
                        via-black/5
                        to-transparent
                        opacity-0
                        transition-opacity
                        duration-500
                        group-hover:opacity-100
                      "
                  />

                  <div
                    className="
    pointer-events-none
    absolute
    inset-x-0
    bottom-0
    translate-y-4
    p-4
    opacity-0
    transition-all
    duration-500
    group-hover:translate-y-0
    group-hover:opacity-100
    md:p-5
  "
                  >
                    <p
                      className="
      text-[8px]
      font-bold
      uppercase
      tracking-[0.26em]
      text-[#E8E9EB]/50
    "
                    >
                      {String(index + 1).padStart(2, "0")} / {project.type}
                    </p>

                    <div className="mt-1.5 flex items-end justify-between gap-3">
                      <h2
                        className="
        max-w-[78%]
        font-black
        uppercase
        leading-[0.95]
        tracking-[-0.015em]
        text-[#F4F5F6]
      "
                        style={{
                          fontSize:
                            project.motion?.ratio === "16:9"
                              ? "clamp(0.95rem, 1.35vw, 1.6rem)"
                              : "clamp(1.1rem, 1.75vw, 2rem)",
                        }}
                      >
                        {project.title}
                      </h2>

                      <span
                        className="
        flex
        size-9
        shrink-0
        items-center
        justify-center
        rounded-full
        border
        border-[#E8E9EB]/25
        bg-black/30
        backdrop-blur-md
      "
                      >
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </section>
        )}

        <div
          className="
            mt-12
            flex
            items-center
            justify-between
            border-t
            border-[#E8E9EB]/10
            py-7
          "
        >
          <span
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.3em]
              text-[#E8E9EB]/25
            "
          >
            Select a visual module
          </span>

          <span
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.3em]
              text-[#E8E9EB]/25
            "
          >
            ESC / Close
          </span>
        </div>
      </div>
      <RouteLoadingOverlay visible={isRouteLoading} label="Opening project" />
    </motion.main>
  );
}
