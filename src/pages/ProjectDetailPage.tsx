import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Navigate, useParams } from "react-router-dom";

import { PROJECT_CATEGORIES } from "../data/projects/index";

import RouteLoadingOverlay from "../components/navigation/RouteLoadingOverlay";
import useHudNavigate from "../hooks/useHudNavigate";

export default function ProjectDetailPage() {
  const { categoryId, projectId } = useParams();
  const { hudNavigate, isRouteLoading } = useHudNavigate();

  const category = PROJECT_CATEGORIES.find((item) => item.id === categoryId);

  const project = category?.projects.find((item) => item.id === projectId);

  const [activeGroup, setActiveGroup] = useState(0);

  const [accentColor, setAccentColor] = useState("48, 92, 180");

  const closeDetail = useCallback(() => {
    if (!categoryId) {
      hudNavigate("/", {
        replace: true,
        state: {
          scrollTo: "projects",
        },
      });

      return;
    }

    hudNavigate(`/projects/${categoryId}`, {
      replace: true,
    });
  }, [categoryId, hudNavigate]);

  const safeActiveGroup = useMemo(() => {
    if (!project) return 0;

    if (project.groups.length === 0) {
      return 0;
    }

    return Math.min(activeGroup, project.groups.length - 1);
  }, [activeGroup, project]);

  const group = project?.groups[safeActiveGroup];

  const isMotion = Boolean(project?.motion);

  const activeBackgroundImage =
    project?.video?.thumbnail ||
    group?.images[0]?.src ||
    project?.thumbnail ||
    "";

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      event.preventDefault();
      event.stopPropagation();
      closeDetail();
    };

    window.addEventListener("keydown", handleKeyDown, true);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [closeDetail]);

  useEffect(() => {
    setActiveGroup(0);
  }, [projectId]);

  useEffect(() => {
    if (!activeBackgroundImage) {
      setAccentColor("48, 92, 180");
      return;
    }

    let cancelled = false;

    const image = new Image();

    image.src = activeBackgroundImage;
    image.crossOrigin = "anonymous";

    image.onload = () => {
      if (cancelled) return;

      const canvas = document.createElement("canvas");

      const context = canvas.getContext("2d", {
        willReadFrequently: true,
      });

      if (!context) return;

      const sampleSize = 48;

      canvas.width = sampleSize;
      canvas.height = sampleSize;

      context.drawImage(image, 0, 0, sampleSize, sampleSize);

      const { data } = context.getImageData(0, 0, sampleSize, sampleSize);

      let red = 0;
      let green = 0;
      let blue = 0;
      let totalWeight = 0;

      for (let index = 0; index < data.length; index += 4) {
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const alpha = data[index + 3];

        if (alpha < 180) continue;

        const brightness = (r + g + b) / 3;

        const saturation = Math.max(r, g, b) - Math.min(r, g, b);

        if (brightness < 28 || brightness > 238) {
          continue;
        }

        const weight = 1 + saturation / 55;

        red += r * weight;
        green += g * weight;
        blue += b * weight;
        totalWeight += weight;
      }

      if (totalWeight === 0) return;

      const averageRed = Math.round(red / totalWeight);

      const averageGreen = Math.round(green / totalWeight);

      const averageBlue = Math.round(blue / totalWeight);

      setAccentColor(`${averageRed}, ${averageGreen}, ${averageBlue}`);
    };

    return () => {
      cancelled = true;
    };
  }, [activeBackgroundImage]);

  if (!category || !project) {
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
        scale: 0.92,
        filter: "blur(12px)",
      }}
      animate={{
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      }}
      exit={{
        opacity: 0,
        scale: 0.95,
        filter: "blur(8px)",
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative
        h-screen
        overflow-hidden
        bg-[#080808]
        text-[#E8E9EB]
      "
    >
      {/* Dynamic background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {project.motion ? (
          <motion.video
            key={project.motion.src}
            src={project.motion.src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            initial={{
              opacity: 0,
              scale: 1.12,
            }}
            animate={{
              opacity: 0.18,
              scale: 1.22,
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
              object-cover
              blur-[90px]
              brightness-50
              saturate-125
            "
          />
        ) : (
          activeBackgroundImage && (
            <AnimatePresence mode="sync">
              <motion.img
                key={activeBackgroundImage}
                src={activeBackgroundImage}
                alt=""
                aria-hidden="true"
                initial={{
                  opacity: 0,
                  scale: 1.18,
                  filter: "blur(115px) saturate(1.05)",
                }}
                animate={{
                  opacity: 0.26,
                  scale: 1.28,
                  filter: "blur(105px) saturate(1.3)",
                }}
                exit={{
                  opacity: 0,
                  scale: 1.34,
                  filter: "blur(125px) saturate(1)",
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  brightness-75
                  contrast-125
                "
              />
            </AnimatePresence>
          )
        )}

        <motion.div
          animate={{
            background: `
              radial-gradient(
                circle at 32% 35%,
                rgba(${accentColor}, 0.34) 0%,
                rgba(${accentColor}, 0.14) 34%,
                transparent 68%
              )
            `,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        />

        <motion.div
          animate={{
            background: `
              radial-gradient(
                circle at 78% 48%,
                rgba(${accentColor}, 0.13) 0%,
                transparent 55%
              )
            `,
          }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        />

        <div className="absolute inset-0 bg-[#080808]/74" />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 28%, rgba(8,8,8,0.34) 72%, rgba(8,8,8,0.78) 100%)",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.016]"
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
      </div>

      {/* Close */}
      <button
        type="button"
        onClick={closeDetail}
        aria-label="Close project detail"
        className="
          group
          fixed
          right-6
          top-6
          z-[100]
          flex
          items-center
          gap-3
          text-[#E8E9EB]/60
          transition-colors
          duration-300
          hover:text-[#E8E9EB]
          md:right-8
          md:top-8
        "
      >
        <span
          className="
            hidden
            text-[9px]
            font-bold
            uppercase
            tracking-[0.28em]
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
            md:block
          "
        >
          Close
        </span>

        <span className="relative flex size-10 items-center justify-center">
          <span className="absolute left-0 top-0 size-2.5 border-l border-t border-[#E8E9EB]/45 transition-all duration-300 group-hover:size-3" />
          <span className="absolute right-0 top-0 size-2.5 border-r border-t border-[#E8E9EB]/45 transition-all duration-300 group-hover:size-3" />
          <span className="absolute bottom-0 left-0 size-2.5 border-b border-l border-[#E8E9EB]/45 transition-all duration-300 group-hover:size-3" />
          <span className="absolute bottom-0 right-0 size-2.5 border-b border-r border-[#E8E9EB]/45 transition-all duration-300 group-hover:size-3" />

          <X
            size={19}
            className="
              transition-transform
              duration-300
              group-hover:rotate-90
            "
          />
        </span>
      </button>

      {/* Main content */}
      <div
        className="
          relative
          z-10
          mx-auto
          grid
          h-full
          max-w-[1800px]
          grid-cols-1
          gap-5
          px-5
          pb-5
          pt-20
          md:px-8
          md:pb-8
          md:pt-20
          lg:grid-cols-[minmax(0,1.45fr)_minmax(310px,0.55fr)]
          lg:gap-10
        "
      >
        {/* Media area */}
        <section
          className="
            relative
            flex
            min-h-0
            items-center
            justify-center
            overflow-hidden
          "
        >
          <span className="pointer-events-none absolute left-0 top-0 z-20 size-6 border-l border-t border-[#E8E9EB]/35" />
          <span className="pointer-events-none absolute right-0 top-0 z-20 size-6 border-r border-t border-[#E8E9EB]/35" />
          <span className="pointer-events-none absolute bottom-0 left-0 z-20 size-6 border-b border-l border-[#E8E9EB]/35" />
          <span className="pointer-events-none absolute bottom-0 right-0 z-20 size-6 border-b border-r border-[#E8E9EB]/35" />

          <motion.div
            animate={{
              boxShadow: `
                inset 0 0 100px rgba(${accentColor}, 0.055)
              `,
            }}
            transition={{
              duration: 0.65,
            }}
            className="pointer-events-none absolute inset-0"
          />

          <div className="relative flex h-full w-full min-h-0 flex-col">
            <div className="min-h-0 flex-1">
              {project.brand ? (
                <motion.div
                  key={`${project.id}-brand`}
                  initial={{
                    opacity: 0,
                    scale: 0.97,
                    filter: "blur(7px)",
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 0.48,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    h-full
                    min-h-0
                    w-full
                    overflow-hidden
                    p-3
                    md:p-5
                  "
                >
                  <div
                    className="
                      brand-scrollbar
                      h-full
                      w-full
                      overflow-y-auto
                      overscroll-contain
                      rounded-[18px]
                      bg-[#E9EAEC]/[0.035]
                      px-3
                      py-4
                      md:px-5
                      md:py-6
                    "
                  >
                    <div
                      className="
                        mx-auto
                        flex
                        w-full
                        max-w-[1180px]
                        flex-col
                        gap-5
                        pb-4
                        md:gap-7
                      "
                    >
                      {project.brand.pages.map((page, index) => (
                        <motion.figure
                          key={page}
                          initial={{
                            opacity: 0,
                            y: 22,
                            scale: 0.985,
                          }}
                          whileInView={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                          }}
                          viewport={{
                            once: true,
                            amount: 0.08,
                            margin: "0px 0px -8% 0px",
                          }}
                          transition={{
                            duration: 0.48,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="
                              group
                              relative
                              overflow-hidden
                              rounded-[14px]
                              bg-white
                              shadow-[0_18px_65px_rgba(0,0,0,0.32)]
                            "
                        >
                          <img
                            src={page}
                            alt={`${project.title} — page ${index + 1}`}
                            loading={index < 2 ? "eager" : "lazy"}
                            decoding="async"
                            className="
                                block
                                h-auto
                                w-full
                                select-none
                                object-contain
                              "
                          />

                          <figcaption
                            className="
                                pointer-events-none
                                absolute
                                bottom-3
                                right-3
                                rounded-full
                                border
                                border-black/10
                                bg-white/80
                                px-2.5
                                py-1
                                text-[8px]
                                font-bold
                                uppercase
                                tracking-[0.2em]
                                text-black/45
                                opacity-0
                                backdrop-blur-md
                                transition-opacity
                                duration-300
                                group-hover:opacity-100
                              "
                          >
                            {String(index + 1).padStart(2, "0")} /{" "}
                            {String(project.brand!.pages.length).padStart(
                              2,
                              "0",
                            )}
                          </figcaption>
                        </motion.figure>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : project.video ? (
                <motion.div
                  key={project.video.vimeo || project.video.src || project.id}
                  initial={{ opacity: 0, scale: 0.96, filter: "blur(7px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-full min-h-0 w-full items-center justify-center p-5 md:p-7"
                >
                  {project.video.vimeo ? (
                    <div className="relative aspect-video w-full overflow-hidden rounded-[18px] bg-black">
                      <iframe
                        src={project.video.vimeo}
                        title={project.title}
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full border-0"
                      />
                    </div>
                  ) : project.video.src ? (
                    <video
                      src={project.video.src}
                      poster={project.video.thumbnail}
                      controls
                      playsInline
                      preload="metadata"
                      className="block max-h-full max-w-full rounded-[18px] bg-black object-contain"
                    >
                      Your browser does not support video playback.
                    </video>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] font-bold uppercase tracking-[0.28em] text-[#E8E9EB]/35">
                      Video source unavailable
                    </div>
                  )}
                </motion.div>
              ) : project.motion ? (
                <motion.div
                  key={project.motion.src}
                  initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.97, filter: "blur(5px)" }}
                  transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-full min-h-0 w-full items-center justify-center p-5 md:p-7"
                >
                  <video
                    src={project.motion.src}
                    autoPlay
                    loop
                    controls
                    playsInline
                    preload="metadata"
                    className="block max-h-full max-w-full bg-black object-contain"
                  >
                    Your browser does not support video playback.
                  </video>
                </motion.div>
              ) : group ? (
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={group.id}
                    initial={{ opacity: 0, scale: 0.96, filter: "blur(7px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.975, filter: "blur(5px)" }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    className={`
                      grid h-full w-full min-h-0 items-center justify-items-center gap-3 px-5 pt-5 md:px-7 md:pt-7
                      ${group.layout === "single"
                        ? "grid-cols-1"
                        : group.layout === "pair"
                          ? "grid-cols-2"
                          : "grid-cols-3"
                      }
                    `}
                  >
                    {group.images.map((image) => (
                      <div
                        key={image.src}
                        className="flex h-full min-h-0 w-full items-center justify-center overflow-hidden"
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          loading="eager"
                          decoding="async"
                          className="block max-h-full max-w-full object-contain"
                        />
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              ) : null}
            </div>

            {!project.motion &&
              !project.brand &&
              !project.video &&
              project.groups.length > 1 && (
                <div
                  className="
                    flex
                    h-16
                    shrink-0
                    items-center
                    justify-center
                    gap-1
                  "
                >
                  {project.groups.map((item, index) => {
                    const isActive = index === safeActiveGroup;

                    return (
                      <motion.button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveGroup(index)}
                        aria-label={`Open ${item.label}`}
                        animate={{
                          opacity: isActive ? 1 : 0.42,
                          scale: isActive ? 1.06 : 1,
                        }}
                        whileHover={{
                          opacity: 1,
                          scale: 1.12,
                        }}
                        whileTap={{
                          scale: 0.92,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 340,
                          damping: 24,
                        }}
                        className="
                            group/node
                            relative
                            flex
                            size-11
                            items-center
                            justify-center
                            rounded-full
                          "
                      >
                        <motion.span
                          animate={{
                            scale: isActive ? 1 : 0.78,
                            opacity: isActive ? 0.32 : 0,
                          }}
                          className="
                              absolute
                              size-10
                              rounded-full
                              border
                              border-[#E8E9EB]/20
                            "
                        />

                        <span
                          className={`
                              absolute
                              size-8
                              rounded-full
                              border
                              transition-all
                              duration-300
                              ${isActive
                              ? `
                                    border-[#E8E9EB]/60
                                    shadow-[0_0_16px_rgba(232,233,235,0.14)]
                                  `
                              : `
                                    border-[#E8E9EB]/12
                                    group-hover/node:border-[#E8E9EB]/38
                                  `
                            }
                            `}
                        />

                        <span
                          className={`
                              absolute
                              size-[18px]
                              rounded-full
                              border
                              transition-all
                              duration-300
                              ${isActive
                              ? "border-[#E8E9EB]/32"
                              : "border-[#E8E9EB]/8"
                            }
                            `}
                        />

                        <span
                          className={`
                              relative
                              size-2
                              rounded-full
                              transition-all
                              duration-300
                              ${isActive
                              ? `
                                    bg-[#E8E9EB]
                                    shadow-[0_0_14px_rgba(232,233,235,0.72)]
                                  `
                              : `
                                    bg-[#E8E9EB]/28
                                    group-hover/node:scale-125
                                    group-hover/node:bg-[#E8E9EB]/72
                                  `
                            }
                            `}
                        />
                      </motion.button>
                    );
                  })}
                </div>
              )}
          </div>
        </section>

        {/* Information */}
        <aside
          className="
            relative
            flex
            min-h-0
            flex-col
            justify-center
            overflow-hidden
            px-1
            py-2
            md:px-3
            md:py-4
          "
        >
          <span className="pointer-events-none absolute left-0 top-0 size-5 border-l border-t border-[#E8E9EB]/30" />
          <span className="pointer-events-none absolute right-0 top-0 size-5 border-r border-t border-[#E8E9EB]/30" />
          <span className="pointer-events-none absolute bottom-0 left-0 size-5 border-b border-l border-[#E8E9EB]/30" />
          <span className="pointer-events-none absolute bottom-0 right-0 size-5 border-b border-r border-[#E8E9EB]/30" />

          <motion.div
            initial={{
              opacity: 0,
              x: 24,
              filter: "blur(6px)",
            }}
            animate={{
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
            }}
            transition={{
              delay: 0.12,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="px-4 md:px-6"
          >
            <div className="flex items-center gap-3">
              <span
                className="
                  shrink-0
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.3em]
                  text-[#E8E9EB]/35
                "
              >
                PRJ / DETAIL
              </span>

              <div className="h-px flex-1 bg-gradient-to-r from-[#E8E9EB]/30 to-transparent" />
            </div>

            <p
              className="
                mt-6
                text-[9px]
                font-bold
                uppercase
                tracking-[0.28em]
                text-[#E8E9EB]/40
              "
            >
              {project.type}
            </p>

            <h1
              className="
                mt-3
                font-black
                uppercase
                leading-[0.9]
                tracking-[-0.025em]
                text-[#F4F5F6]
              "
              style={{
                fontSize: "clamp(2rem, 4.2vw, 4.6rem)",
              }}
            >
              {project.title}
            </h1>

            <p
              className="
                mt-5
                max-w-md
                text-sm
                font-light
                leading-[1.65]
                text-[#E8E9EB]/55
                xl:text-base
              "
            >
              {project.description}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4">
              <InfoItem label="Role" value={project.role} />

              <InfoItem label="Client" value={project.client} />

              <InfoItem label="Year" value={project.year} />

              <InfoItem label="Tools" value={project.tools.join(" / ")} />
            </div>
          </motion.div>
        </aside>
      </div>
      <RouteLoadingOverlay visible={isRouteLoading} label="Closing project" />

      <style>{`
        .brand-scrollbar {
          scrollbar-width: thin;
          scrollbar-color:
            rgba(232, 233, 235, 0.28)
            rgba(232, 233, 235, 0.05);
        }

        .brand-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .brand-scrollbar::-webkit-scrollbar-track {
          background: rgba(232, 233, 235, 0.04);
          border-radius: 999px;
        }

        .brand-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(232, 233, 235, 0.24);
          border: 2px solid transparent;
          border-radius: 999px;
          background-clip: padding-box;
        }

        .brand-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(232, 233, 235, 0.42);
          border: 2px solid transparent;
          background-clip: padding-box;
        }
      `}</style>
    </motion.main>
  );
}

interface InfoItemProps {
  label: string;
  value: string;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div>
      <p
        className="
          text-[8px]
          font-bold
          uppercase
          tracking-[0.27em]
          text-[#E8E9EB]/25
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          line-clamp-2
          text-xs
          font-medium
          leading-relaxed
          text-[#E8E9EB]/65
          xl:text-sm
        "
      >
        {value}
      </p>
    </div>
  );
}
