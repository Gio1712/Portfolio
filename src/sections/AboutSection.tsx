import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import AboutModelStage from "../components/model/AboutModelStage";

const BIO_TEXT =
  "Hi, I'm Dat — a Graphic Designer specializing in poster design, branding and motion graphics. With nearly two years of professional experience, I've developed a workflow that combines creative thinking with AI-assisted design to accelerate production without compromising quality. I believe great design is more than visual appeal—it communicates ideas, tells stories and creates meaningful experiences. Every project is an opportunity to build something purposeful, memorable and visually engaging.";

const EXPERIENCE = [
  {
    role: "GRAPHIC DESIGNER",
    company: "FREELANCE",
    period: "01/2026 — PRESENT",
  },
  {
    role: "GRAPHIC & MEDIA DESIGNER",
    company: "PIXEL PERFECT",
    period: "02/2025 — 04/2026",
  },
  {
    role: "GRAPHIC DESIGN INTERN",
    company: "MOBICAM",
    period: "12/2022 — 02/2023",
  },
];

const FRAME_COUNT = 120;

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

function mapRange(
  value: number,
  inStart: number,
  inEnd: number,
  outStart: number,
  outEnd: number,
) {
  const progress = clamp((value - inStart) / (inEnd - inStart));
  return outStart + (outEnd - outStart) * progress;
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;

      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const distance = section.offsetHeight - window.innerHeight;
      const travelled = -rect.top;

      setProgress(
        clamp(distance > 0 ? travelled / distance : 0),
      );
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);

      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const frame = Math.round(progress * (FRAME_COUNT - 1));

  const activeSlide = useMemo(() => {
    if (progress < 0.34) return 0;
    if (progress < 0.68) return 1;
    return 2;
  }, [progress]);

  const visualFor = (
    start: number,
    peakStart: number,
    peakEnd: number,
    end: number,
  ) => {
    if (progress <= start) {
      return {
        opacity: 0,
        filter: "blur(14px) brightness(0.72)",
      };
    }

    if (progress < peakStart) {
      const local = clamp(
        (progress - start) / (peakStart - start),
      );

      return {
        opacity: local,
        filter: `blur(${mapRange(local, 0, 1, 14, 0)}px) brightness(${mapRange(
          local,
          0,
          1,
          0.72,
          1,
        )})`,
      };
    }

    if (progress <= peakEnd) {
      return {
        opacity: 1,
        filter: "blur(0px) brightness(1)",
      };
    }

    if (progress < end) {
      const local = clamp(
        (progress - peakEnd) / (end - peakEnd),
      );

      return {
        opacity: 1 - local,
        filter: `blur(${mapRange(local, 0, 1, 0, 14)}px) brightness(${mapRange(
          local,
          0,
          1,
          1,
          0.72,
        )})`,
      };
    }

    return {
      opacity: 0,
      filter: "blur(14px) brightness(0.72)",
    };
  };

  const slide1Visual = visualFor(
    -0.08,
    0,
    0.22,
    0.38,
  );

  const slide2Visual = visualFor(
    0.28,
    0.39,
    0.58,
    0.72,
  );

  const slide3Visual = visualFor(
    0.62,
    0.73,
    1,
    1.08,
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative h-[320dvh] bg-black lg:h-[330vh]"
    >
      <div className="sticky top-0 h-[100dvh] min-h-[640px] overflow-hidden bg-black">
        <AboutModelStage frame={frame} mobile={isMobile} />

        <div className="relative z-20 h-full px-5 pb-5 pt-20 sm:px-6 md:px-10 md:pt-24 lg:px-20 lg:py-24">
          <motion.div
            style={{
              ...slide1Visual,
              willChange: "opacity, filter",
              pointerEvents: activeSlide === 0 ? "auto" : "none",
            }}
            className="
              absolute
              left-5
              right-5
              top-20
              z-30
              max-h-[36dvh]
              overflow-y-auto
              rounded-[18px]
              bg-black/88
              px-3
              py-4
              text-center
              sm:left-6
              sm:right-6
              md:left-10
              md:right-10
              lg:left-auto
              lg:right-[5vw]
              lg:top-1/2
              lg:w-[38vw]
              lg:max-w-xl
              lg:-translate-y-1/2
              lg:overflow-visible
              lg:bg-transparent
              lg:p-0
              lg:text-left
            "
          >
            <h2
              className="mb-4 whitespace-nowrap font-black uppercase leading-none text-[#E8E9EB] lg:mb-8"
              style={{
                fontSize: "clamp(2.1rem, 6vw, 4.5rem)",
              }}
            >
              About me
            </h2>

            <p className="text-[0.82rem] font-light leading-[1.56] text-[#E8E9EB]/75 sm:text-[0.9rem] lg:text-[clamp(1rem,1.45vw,1.2rem)] lg:leading-[1.8]">
              {BIO_TEXT}
            </p>
          </motion.div>

          <motion.div
            style={{
              ...slide2Visual,
              willChange: "opacity, filter",
              pointerEvents: activeSlide === 1 ? "auto" : "none",
            }}
            className="
              absolute
              left-5
              right-5
              top-20
              z-30
              grid
              max-h-[34dvh]
              gap-4
              overflow-y-auto
              rounded-[18px]
              bg-black/88
              px-3
              py-4
              text-center
              sm:left-6
              sm:right-6
              md:left-10
              md:right-10
              lg:inset-x-[5vw]
              lg:top-1/2
              lg:max-h-none
              lg:-translate-y-1/2
              lg:grid-cols-[minmax(260px,1fr)_minmax(420px,34vw)_minmax(260px,1fr)]
              lg:items-center
              lg:gap-10
              lg:overflow-visible
              lg:bg-transparent
              lg:p-0
              lg:text-left
            "
          >
            <div className="mx-auto flex w-full max-w-[350px] flex-col items-center lg:mx-0 lg:items-start">
              <p className="text-base font-bold uppercase tracking-[0.08em] text-[#E8E9EB] md:text-lg">
                FPT UNIVERSITY
              </p>
              <p className="mt-2 text-sm text-[#E8E9EB]/65 md:text-base">
                2019–2024
              </p>

              <div className="mt-6 hidden w-full lg:block">
                <div className="mb-3 flex items-center gap-3">
                  <span className="shrink-0 text-[10px] uppercase tracking-[0.28em] text-[#E8E9EB]/35">
                    EDU / 01
                  </span>

                  <div className="h-px flex-1 bg-gradient-to-r from-[#E8E9EB]/45 to-transparent" />
                </div>

                <div className="relative h-24">
                  <div className="absolute left-0 top-0 h-px w-[78%] bg-[#E8E9EB]/25" />
                  <div className="absolute left-[78%] top-0 h-14 w-px bg-[#E8E9EB]/30" />
                  <div className="absolute left-[78%] top-14 h-px w-[22%] bg-gradient-to-r from-[#E8E9EB]/45 to-transparent" />

                  <div className="absolute left-[calc(78%-6px)] top-[51px] size-3 rounded-full border border-[#E8E9EB]/45">
                    <div className="absolute inset-[3px] rounded-full bg-[#E8E9EB]" />
                  </div>

                  <div className="absolute left-[calc(78%-10px)] top-[47px] size-5 rounded-full border border-[#E8E9EB]/10" />
                </div>
              </div>
            </div>

            <div aria-hidden="true" className="hidden h-full lg:block" />

            <div className="mx-auto flex w-full max-w-[390px] flex-col items-center lg:mx-0 lg:items-end lg:text-right">
              <p className="text-sm font-medium leading-relaxed text-[#E8E9EB]/80 md:text-base">
                Studied Graphic Design with a focus on visual communication,
                branding, digital media and creative problem-solving.
              </p>

              <div className="mt-6 hidden w-full lg:block">
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-l from-[#E8E9EB]/45 to-transparent" />

                  <span className="shrink-0 text-[10px] uppercase tracking-[0.28em] text-[#E8E9EB]/35">
                    PROFILE / 02
                  </span>
                </div>

                <div className="relative h-24">
                  <div className="absolute right-0 top-0 h-px w-[78%] bg-[#E8E9EB]/25" />
                  <div className="absolute right-[78%] top-0 h-14 w-px bg-[#E8E9EB]/30" />
                  <div className="absolute right-[78%] top-14 h-px w-[22%] bg-gradient-to-l from-[#E8E9EB]/45 to-transparent" />

                  <div className="absolute right-[calc(78%-6px)] top-[51px] size-3 rounded-full border border-[#E8E9EB]/45">
                    <div className="absolute inset-[3px] rounded-full bg-[#E8E9EB]" />
                  </div>

                  <div className="absolute right-[calc(78%-10px)] top-[47px] size-5 rounded-full border border-[#E8E9EB]/10" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{
              ...slide3Visual,
              willChange: "opacity, filter",
              pointerEvents: activeSlide === 2 ? "auto" : "none",
            }}
            className="
              absolute
              left-5
              right-5
              top-20
              z-30
              max-h-[38dvh]
              overflow-y-auto
              rounded-[18px]
              bg-black/88
              px-3
              py-4
              sm:left-6
              sm:right-6
              md:left-10
              md:right-10
              lg:left-[5vw]
              lg:right-auto
              lg:top-1/2
              lg:w-[43vw]
              lg:max-w-2xl
              lg:-translate-y-1/2
              lg:overflow-visible
              lg:bg-transparent
              lg:p-0
            "
          >
            <h2
              className="mb-4 text-center font-black uppercase leading-none text-[#E8E9EB] lg:mb-10 lg:text-left"
              style={{
                fontSize: "clamp(2.1rem, 6vw, 4.5rem)",
              }}
            >
              Experience
            </h2>

            <div className="flex flex-col">
              {EXPERIENCE.map((job) => (
                <div
                  key={`${job.role}-${job.company}`}
                  className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 border-b border-[#E8E9EB]/15 py-2.5 lg:gap-5 lg:py-5"
                >
                  <div className="min-w-0">
                    <p className="text-[0.76rem] font-bold uppercase text-[#E8E9EB] sm:text-sm md:text-base">
                      {job.role}
                    </p>

                    <p className="mt-0.5 text-xs text-[#E8E9EB]/55 sm:text-sm">
                      {job.company}
                    </p>
                  </div>

                  <span className="whitespace-nowrap pt-0.5 text-[0.64rem] text-[#E8E9EB]/45 sm:text-xs md:text-sm">
                    {job.period}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="absolute bottom-3 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3">
            {[0, 1, 2].map((index) => {
              const isActive = activeSlide === index;

              return (
                <div
                  key={index}
                  className="relative flex size-9 items-center justify-center rounded-full lg:size-10"
                >
                  <span
                    className={`absolute size-7 rounded-full border border-[#E8E9EB]/45 transition-all duration-300 lg:size-8 ${isActive
                        ? "scale-100 opacity-70"
                        : "scale-75 opacity-20"
                      }`}
                  />

                  <span
                    className={`relative rounded-full bg-[#E8E9EB] transition-all duration-300 ${isActive
                        ? "size-2.5 opacity-100"
                        : "size-1.5 opacity-50"
                      }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}