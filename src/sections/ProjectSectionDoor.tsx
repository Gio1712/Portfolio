import { useState } from "react";

import FadeIn from "../components/effects/FadeIn";
import ProjectDoor from "../components/projects/ProjectDoor";
import { PROJECTS } from "../data/projectdoor";

export default function ProjectSectionDoor() {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <section
      id="projects"
      className="
        relative
        overflow-hidden
        bg-[#080808]
        px-5
        py-24
        text-[#E8E9EB]
        sm:px-8
        sm:py-28
        md:px-10
        md:py-32
      "
    >
      {/* =========================
          BACKGROUND
      ========================= */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 10%, rgba(232,233,235,0.05), transparent 44%)",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(232,233,235,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(232,233,235,0.4) 1px, transparent 1px)
            `,
            backgroundSize: "78px 78px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1800px]">
        {/* =========================
            HEADER
        ========================= */}
        <FadeIn delay={0} y={28}>
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-4">
              <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.34em] text-[#E8E9EB]/35">
                SYS / PROJECT ARCHIVE
              </span>

              <div className="h-px flex-1 bg-gradient-to-r from-[#E8E9EB]/25 to-transparent" />
            </div>

            <div className="mt-6 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <h2
                className="
                  font-black
                  uppercase
                  leading-none
                  text-[#F4F5F6]
                "
                style={{
                  fontSize: "clamp(3.2rem, 10vw, 9rem)",
                }}
              >
                Projects
              </h2>

              <p className="max-w-sm text-sm font-light leading-relaxed text-[#E8E9EB]/45 md:text-base">
                Selected visual systems, campaigns and digital experiences.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* =========================
            PROJECT DOORS — DESKTOP
        ========================= */}
        <FadeIn delay={0.1} y={30}>
          <div
            className="
              hidden
              h-[68vh]
              min-h-[620px]
              max-h-[820px]
              gap-3
              lg:flex
            "
            onMouseLeave={() => setActiveProject(null)}
          >
            {PROJECTS.map((project, index) => (
              <ProjectDoor
                key={project.number}
                project={project}
                index={index}
                activeIndex={activeProject}
                onActivate={setActiveProject}
              />
            ))}
          </div>
        </FadeIn>

        {/* =========================
            TABLET / MOBILE
        ========================= */}
        <div className="flex flex-col gap-4 lg:hidden">
          {PROJECTS.map((project, index) => (
            <ProjectDoor
              key={project.number}
              project={project}
              index={index}
              activeIndex={activeProject}
              onActivate={setActiveProject}
            />
          ))}
        </div>

        {/* Footer status */}
        <div className="mt-8 flex items-center justify-between gap-5">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#E8E9EB]/25">
            Hover or select a module
          </span>

          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#E8E9EB]/60 shadow-[0_0_10px_rgba(232,233,235,0.35)]" />

            <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#E8E9EB]/35">
              Archive online
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
