import FadeIn from "../components/effects/FadeIn";
import ProjectCard from "./ProjectCard";
import { PROJECTS } from "../data/projects";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 bg-[#0A0A0A] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-10"
    >
      <FadeIn delay={0} y={30}>
        <h2
          className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Project
        </h2>
      </FadeIn>

      <div className="flex flex-col gap-10">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            totalCards={PROJECTS.length}
          />
        ))}
      </div>
    </section>
  );
}
