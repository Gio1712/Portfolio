import { AnimatePresence, motion } from "framer-motion";

import { ArrowLeft, ArrowUpRight, X } from "lucide-react";

import { useEffect, useState } from "react";

import type {
  CategoryProject,
  ProjectCategory,
} from "../../data/projectCategories";

import ProjectDetailViewer from "./ProjectDetailViewer";

interface ProjectCategoryOverlayProps {
  category: ProjectCategory;
  onClose: () => void;
}

export default function ProjectCategoryOverlay({
  category,
  onClose,
}: ProjectCategoryOverlayProps) {
  const [activeProject, setActiveProject] = useState<CategoryProject | null>(
    null,
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      if (activeProject) {
        setActiveProject(null);
        return;
      }

      onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProject, onClose]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        backdropFilter: "blur(0px)",
      }}
      animate={{
        opacity: 1,
        backdropFilter: "blur(14px)",
      }}
      exit={{
        opacity: 0,
        backdropFilter: "blur(0px)",
      }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        fixed
        inset-0
        z-[500]
        overflow-y-auto
        bg-black/85
      "
    >
      {/* Background ảnh mờ */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-20 blur-2xl saturate-75">
        <div className="grid h-full grid-cols-2 gap-3 md:grid-cols-4">
          {category.projects.slice(0, 8).map((project) => {
            const previewImage =
              project.groups[0]?.images[0]?.src || project.thumbnail;

            return (
              <img
                key={project.id}
                src={previewImage}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover"
              />
            );
          })}
        </div>
      </div>

      {/* Overlay content */}
      <div className="relative min-h-screen bg-[#080808]/80">
        <div
          className="
            mx-auto
            max-w-[1900px]
            px-4
            py-6
            sm:px-6
            md:px-10
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="
                group
                inline-flex
                items-center
                gap-3
                text-[10px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-[#E8E9EB]/50
                transition-colors
                hover:text-[#E8E9EB]
              "
            >
              <ArrowLeft
                size={16}
                className="
                  transition-transform
                  group-hover:-translate-x-1
                "
              />
              Back to doors
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close category"
              className="
                flex
                size-10
                items-center
                justify-center
                rounded-full
                border
                border-[#E8E9EB]/15
                text-[#E8E9EB]/60
                transition-all
                duration-300
                hover:rotate-90
                hover:border-[#E8E9EB]/40
                hover:text-[#E8E9EB]
              "
            >
              <X size={17} />
            </button>
          </div>

          {/* Category heading */}
          <div
            className="
              my-10
              grid
              gap-8
              md:grid-cols-[1fr_440px]
              md:items-end
            "
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#E8E9EB]/35">
                Project category / 01
              </p>

              <h2
                className="
                  mt-5
                  font-black
                  uppercase
                  leading-[0.88]
                  text-[#F4F5F6]
                "
                style={{
                  fontSize: "clamp(3.6rem, 10vw, 10rem)",
                }}
              >
                {category.title}
              </h2>
            </div>

            <p className="font-light leading-[1.8] text-[#E8E9EB]/50">
              {category.subtitle}
            </p>
          </div>

          {/* Poster wall */}
          <motion.div
            initial={{
              opacity: 0,
              y: 28,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.55,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              grid
              grid-cols-1
              items-start
              gap-4
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >
            {category.projects.map((project, index) => {
              const previewImage =
                project.groups[0]?.images[0]?.src || project.thumbnail;

              return (
                <motion.button
                  key={project.id}
                  type="button"
                  onClick={() => setActiveProject(project)}
                  initial={{
                    opacity: 0,
                    y: 22,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                      group
                      relative
                      block
                      w-full
                      cursor-pointer
                      overflow-hidden
                      rounded-[20px]
                      border
                      border-[#E8E9EB]/10
                      bg-[#0D0E11]
                      text-left
                      transition-colors
                      duration-300
                      hover:border-[#E8E9EB]/30
                    "
                >
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

                  {/* Overlay hover */}
                  <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/90
                        via-black/10
                        to-transparent
                        opacity-0
                        transition-opacity
                        duration-400
                        group-hover:opacity-100
                      "
                  />

                  {/* HUD corners */}
                  <span className="pointer-events-none absolute left-4 top-4 size-4 border-l border-t border-[#E8E9EB]/35 opacity-0 transition-opacity group-hover:opacity-100" />

                  <span className="pointer-events-none absolute right-4 top-4 size-4 border-r border-t border-[#E8E9EB]/35 opacity-0 transition-opacity group-hover:opacity-100" />

                  <span className="pointer-events-none absolute bottom-4 left-4 size-4 border-b border-l border-[#E8E9EB]/35 opacity-0 transition-opacity group-hover:opacity-100" />

                  <span className="pointer-events-none absolute bottom-4 right-4 size-4 border-b border-r border-[#E8E9EB]/35 opacity-0 transition-opacity group-hover:opacity-100" />

                  {/* Info */}
                  <div
                    className="
                        pointer-events-none
                        absolute
                        inset-x-0
                        bottom-0
                        translate-y-5
                        p-5
                        opacity-0
                        transition-all
                        duration-400
                        group-hover:translate-y-0
                        group-hover:opacity-100
                      "
                  >
                    <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#E8E9EB]/50">
                      0{index + 1} / {project.type}
                    </p>

                    <div className="mt-2 flex items-end justify-between gap-4">
                      <h3
                        className="
                            font-black
                            uppercase
                            leading-[0.92]
                            text-[#F4F5F6]
                          "
                        style={{
                          fontSize: "clamp(1.4rem, 2.2vw, 2.6rem)",
                        }}
                      >
                        {project.title}
                      </h3>

                      <span
                        className="
                            flex
                            size-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-[#E8E9EB]/25
                            bg-black/20
                            backdrop-blur-md
                          "
                      >
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Detail popup */}
      <AnimatePresence>
        {activeProject && (
          <ProjectDetailViewer
            project={activeProject}
            onBack={() => setActiveProject(null)}
            onClose={onClose}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
