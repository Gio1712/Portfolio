import { AnimatePresence, motion } from "framer-motion";

import { ArrowLeft, Maximize2, X } from "lucide-react";

import { useEffect, useState } from "react";

import type { CategoryProject } from "../../data/projectCategories";

interface ProjectDetailViewerProps {
  project: CategoryProject;
  onBack: () => void;
  onClose: () => void;
}

export default function ProjectDetailViewer({
  project,
  onBack,
  onClose,
}: ProjectDetailViewerProps) {
  const [activeGroup, setActiveGroup] = useState(0);

  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const group = project.groups[activeGroup];

  useEffect(() => {
    setActiveGroup(0);
    setZoomedImage(null);
  }, [project.id]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      if (zoomedImage) {
        setZoomedImage(null);
        return;
      }

      onBack();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onBack, zoomedImage]);

  const gridClass = {
    single: "grid-cols-1",
    pair: "grid-cols-1 md:grid-cols-2",
    triple: "grid-cols-1 md:grid-cols-3",
  }[group.layout];

  return (
    <>
      {/* Popup background */}
      <motion.div
        onClick={onBack}
        initial={{
          opacity: 0,
          backdropFilter: "blur(0px)",
        }}
        animate={{
          opacity: 1,
          backdropFilter: "blur(18px)",
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
          z-[700]
          overflow-y-auto
          bg-black/75
          p-4
          md:p-8
        "
      >
        <div className="flex min-h-full items-center justify-center">
          {/* Popup panel */}
          <motion.div
            onClick={(event) => event.stopPropagation()}
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.97,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.98,
              filter: "blur(6px)",
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              max-h-[92vh]
              w-full
              max-w-[1700px]
              overflow-y-auto
              rounded-[30px]
              border
              border-[#E8E9EB]/12
              bg-[#090A0D]/95
              shadow-[0_30px_100px_rgba(0,0,0,0.65)]
            "
          >
            {/* Header */}
            <div
              className="
                sticky
                top-0
                z-30
                flex
                items-center
                justify-between
                border-b
                border-[#E8E9EB]/10
                bg-[#090A0D]/90
                px-5
                py-4
                backdrop-blur-xl
                md:px-8
              "
            >
              <button
                type="button"
                onClick={onBack}
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
                Back to wall
              </button>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close gallery"
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

            {/* Main */}
            <div
              className="
                grid
                gap-8
                p-5
                md:p-8
                lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]
                lg:items-start
              "
            >
              {/* Gallery */}
              <div>
                <div
                  className="
                    relative
                    min-h-[62vh]
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-[#E8E9EB]/10
                    bg-[#0D0E11]
                    p-3
                    md:p-5
                  "
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={group.id}
                      initial={{
                        opacity: 0,
                        y: 20,
                        scale: 0.985,
                        filter: "blur(6px)",
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: "blur(0px)",
                      }}
                      exit={{
                        opacity: 0,
                        y: -18,
                        scale: 0.99,
                        filter: "blur(5px)",
                      }}
                      transition={{
                        duration: 0.42,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`grid min-h-[58vh] gap-4 ${gridClass}`}
                    >
                      {group.images.map((image) => (
                        <button
                          key={image.src}
                          type="button"
                          onClick={() => setZoomedImage(image.src)}
                          className="
                              group/image
                              relative
                              flex
                              min-h-[52vh]
                              items-center
                              justify-center
                              overflow-hidden
                              rounded-[18px]
                              bg-black/25
                            "
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            loading="lazy"
                            decoding="async"
                            className="
                                max-h-[75vh]
                                w-full
                                object-contain
                                transition-transform
                                duration-500
                                group-hover/image:scale-[1.015]
                              "
                          />

                          <span
                            className="
                                absolute
                                right-4
                                top-4
                                flex
                                size-9
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-[#E8E9EB]/15
                                bg-black/30
                                text-[#E8E9EB]/50
                                opacity-0
                                backdrop-blur-md
                                transition-all
                                duration-300
                                group-hover/image:opacity-100
                              "
                          >
                            <Maximize2 size={15} />
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Group selector */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                  {project.groups.map((item, index) => {
                    const isActive = index === activeGroup;

                    return (
                      <motion.button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveGroup(index)}
                        animate={{
                          opacity: isActive ? 1 : 0.42,

                          scale: isActive ? 1.08 : 1,
                        }}
                        whileHover={{
                          opacity: 0.9,
                          scale: 1.1,
                        }}
                        whileTap={{
                          scale: 0.94,
                        }}
                        className="
                            relative
                            flex
                            size-10
                            items-center
                            justify-center
                            rounded-full
                          "
                      >
                        <span
                          className={`
                              absolute
                              size-7
                              rounded-full
                              border
                              ${
                                isActive
                                  ? "border-[#E8E9EB]/50"
                                  : "border-[#E8E9EB]/15"
                              }
                            `}
                        />

                        <span
                          className={`
                              relative
                              size-2
                              rounded-full
                              ${
                                isActive
                                  ? `
                                    bg-[#E8E9EB]
                                    shadow-[0_0_12px_rgba(232,233,235,0.55)]
                                  `
                                  : `
                                    bg-[#E8E9EB]/40
                                  `
                              }
                            `}
                        />
                      </motion.button>
                    );
                  })}
                </div>

                <p className="mt-1 text-center text-[9px] font-bold uppercase tracking-[0.28em] text-[#E8E9EB]/35">
                  {group.label} / 0{activeGroup + 1}
                </p>
              </div>

              {/* Project info */}
              <aside
                className="
                  relative
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-[#E8E9EB]/10
                  bg-[#E8E9EB]/[0.025]
                  p-7
                  md:p-9
                "
              >
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.025]
                  "
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(232,233,235,0.4) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(232,233,235,0.4) 1px, transparent 1px)
                    `,
                    backgroundSize: "54px 54px",
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3">
                    <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.3em] text-[#E8E9EB]/35">
                      PRJ / DETAIL
                    </span>

                    <div className="h-px flex-1 bg-gradient-to-r from-[#E8E9EB]/30 to-transparent" />
                  </div>

                  <p className="mt-10 text-[10px] font-bold uppercase tracking-[0.28em] text-[#E8E9EB]/40">
                    {project.type}
                  </p>

                  <h3
                    className="
                      mt-4
                      font-black
                      uppercase
                      leading-[0.9]
                      tracking-[-0.035em]
                      text-[#F4F5F6]
                    "
                    style={{
                      fontSize: "clamp(2.4rem, 5vw, 5.6rem)",
                    }}
                  >
                    {project.title}
                  </h3>

                  <p className="mt-7 font-light leading-[1.8] text-[#E8E9EB]/55">
                    {project.description}
                  </p>

                  <div className="mt-10 border-t border-[#E8E9EB]/10">
                    {[
                      {
                        label: "Role",
                        value: project.role,
                      },
                      {
                        label: "Client",
                        value: project.client,
                      },
                      {
                        label: "Year",
                        value: project.year,
                      },
                      {
                        label: "Tools",
                        value: project.tools.join(" / "),
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="
                          grid
                          grid-cols-[90px_1fr]
                          gap-5
                          border-b
                          border-[#E8E9EB]/10
                          py-4
                        "
                      >
                        <span className="text-[9px] font-bold uppercase tracking-[0.26em] text-[#E8E9EB]/30">
                          {item.label}
                        </span>

                        <span className="text-sm font-medium text-[#E8E9EB]/70">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center gap-3">
                    <div className="relative flex size-9 items-center justify-center">
                      <div className="absolute size-8 rounded-full border border-[#E8E9EB]/15" />

                      <div className="absolute size-5 rounded-full border border-[#E8E9EB]/25" />

                      <div className="size-1.5 rounded-full bg-[#E8E9EB] shadow-[0_0_12px_rgba(232,233,235,0.45)]" />
                    </div>

                    <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#E8E9EB]/35">
                      Project module online
                    </span>
                  </div>
                </div>
              </aside>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Fullscreen image */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            onClick={() => setZoomedImage(null)}
            initial={{
              opacity: 0,
              backdropFilter: "blur(0px)",
            }}
            animate={{
              opacity: 1,
              backdropFilter: "blur(20px)",
            }}
            exit={{
              opacity: 0,
              backdropFilter: "blur(0px)",
            }}
            className="
              fixed
              inset-0
              z-[999]
              flex
              cursor-zoom-out
              items-center
              justify-center
              bg-black/85
              p-5
              md:p-10
            "
          >
            <motion.img
              onClick={(event) => event.stopPropagation()}
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
              }}
              src={zoomedImage}
              alt={project.title}
              className="
                max-h-full
                max-w-full
                rounded-[20px]
                object-contain
              "
            />

            <button
              type="button"
              onClick={() => setZoomedImage(null)}
              aria-label="Close image"
              className="
                absolute
                right-5
                top-5
                flex
                size-11
                items-center
                justify-center
                rounded-full
                border
                border-[#E8E9EB]/20
                bg-black/30
                text-[#E8E9EB]
                backdrop-blur-md
              "
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
