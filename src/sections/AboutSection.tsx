import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import AboutModelStage, {
  TARGET_FRAMES,
} from "../components/model/AboutModelStage";

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

const SLIDE_COUNT = 3;
const WHEEL_TRIGGER = 70;
const TOUCH_TRIGGER = 58;
const EXIT_LOCK_MS = 760;

function clampSlide(index: number) {
  return Math.min(SLIDE_COUNT - 1, Math.max(0, index));
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const activeSlideRef = useRef(0);
  const frameAnimatingRef = useRef(false);
  const currentFrameRef = useRef(TARGET_FRAMES[0] ?? 0);
  const wheelAccumulatorRef = useRef(0);
  const touchStartRef = useRef<number | null>(null);
  const touchAccumulatorRef = useRef(0);
  const exitLockRef = useRef(false);

  const [activeSlide, setActiveSlide] = useState(0);
  const [currentAvatarFrame, setCurrentAvatarFrame] = useState(
    TARGET_FRAMES[0] ?? 0,
  );
  const [isFrameAnimating, setIsFrameAnimating] = useState(false);
  const [displayedSlide, setDisplayedSlide] = useState(0);

  useEffect(() => {
    activeSlideRef.current = activeSlide;
  }, [activeSlide]);

  useEffect(() => {
    frameAnimatingRef.current = isFrameAnimating;
  }, [isFrameAnimating]);

  useEffect(() => {
    currentFrameRef.current = currentAvatarFrame;
  }, [currentAvatarFrame]);

  useEffect(() => {
    if (!isFrameAnimating) {
      setDisplayedSlide(activeSlide);
    }
  }, [activeSlide, isFrameAnimating]);

  const onFrameChange = useCallback((frame: number) => {
    currentFrameRef.current = frame;
    setCurrentAvatarFrame(frame);
  }, []);

  const onAnimationStateChange = useCallback((value: boolean) => {
    frameAnimatingRef.current = value;
    setIsFrameAnimating(value);
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (frameAnimatingRef.current) return;

    const nextSlide = clampSlide(index);

    if (nextSlide === activeSlideRef.current) return;

    activeSlideRef.current = nextSlide;
    setActiveSlide(nextSlide);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isSectionActive = () => {
      const rect = section.getBoundingClientRect();
      const center = window.innerHeight * 0.5;

      return rect.top <= center && rect.bottom >= center;
    };

    const resetInputs = () => {
      wheelAccumulatorRef.current = 0;
      touchAccumulatorRef.current = 0;
      touchStartRef.current = null;
    };

    const leaveSection = (direction: -1 | 1) => {
      if (exitLockRef.current) return;

      exitLockRef.current = true;
      resetInputs();

      const sibling =
        direction > 0
          ? section.nextElementSibling
          : section.previousElementSibling;

      if (sibling instanceof HTMLElement) {
        sibling.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      window.setTimeout(() => {
        exitLockRef.current = false;
      }, EXIT_LOCK_MS);
    };

    const consumeDirection = (direction: -1 | 1) => {
      if (frameAnimatingRef.current) return;

      const slide = activeSlideRef.current;
      const targetFrame = TARGET_FRAMES[slide] ?? 0;

      if (currentFrameRef.current !== targetFrame) return;

      if (slide === 0 && direction < 0) {
        leaveSection(-1);
        return;
      }

      if (slide === SLIDE_COUNT - 1 && direction > 0) {
        leaveSection(1);
        return;
      }

      goToSlide(slide + direction);
    };

    const onWheel = (event: WheelEvent) => {
      if (!isSectionActive() || exitLockRef.current) return;

      event.preventDefault();

      if (frameAnimatingRef.current) {
        wheelAccumulatorRef.current = 0;
        return;
      }

      const normalized = Math.max(
        -40,
        Math.min(40, event.deltaY),
      );

      wheelAccumulatorRef.current += normalized;

      if (
        Math.abs(wheelAccumulatorRef.current) <
        WHEEL_TRIGGER
      ) {
        return;
      }

      const direction =
        wheelAccumulatorRef.current > 0 ? 1 : -1;

      wheelAccumulatorRef.current = 0;
      consumeDirection(direction);
    };

    const onTouchStart = (event: TouchEvent) => {
      if (!isSectionActive() || exitLockRef.current) return;

      touchStartRef.current =
        event.touches[0]?.clientY ?? null;
      touchAccumulatorRef.current = 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (
        !isSectionActive() ||
        exitLockRef.current ||
        touchStartRef.current === null
      ) {
        return;
      }

      const currentY = event.touches[0]?.clientY;
      if (currentY === undefined) return;

      event.preventDefault();

      const delta = touchStartRef.current - currentY;
      touchStartRef.current = currentY;

      if (frameAnimatingRef.current) {
        touchAccumulatorRef.current = 0;
        return;
      }

      touchAccumulatorRef.current += delta;

      if (
        Math.abs(touchAccumulatorRef.current) <
        TOUCH_TRIGGER
      ) {
        return;
      }

      const direction =
        touchAccumulatorRef.current > 0 ? 1 : -1;

      touchAccumulatorRef.current = 0;
      consumeDirection(direction);
    };

    const onTouchEnd = () => {
      touchStartRef.current = null;
      touchAccumulatorRef.current = 0;
    };

    window.addEventListener("wheel", onWheel, {
      passive: false,
      capture: true,
    });
    window.addEventListener("touchstart", onTouchStart, {
      passive: true,
      capture: true,
    });
    window.addEventListener("touchmove", onTouchMove, {
      passive: false,
      capture: true,
    });
    window.addEventListener("touchend", onTouchEnd, {
      passive: true,
      capture: true,
    });

    return () => {
      window.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("touchstart", onTouchStart, true);
      window.removeEventListener("touchmove", onTouchMove, true);
      window.removeEventListener("touchend", onTouchEnd, true);
    };
  }, [goToSlide]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="
        relative
        h-[100dvh]
        min-h-[640px]
        overflow-hidden
        overscroll-none
        bg-black
      "
    >
      <AboutModelStage
        activeSlide={activeSlide}
        onFrameChange={onFrameChange}
        onAnimationStateChange={onAnimationStateChange}
      />

      <div
        className="
          relative
          z-20
          flex
          h-full
          flex-col
          px-5
          pb-4
          pt-20
          sm:px-6
          md:px-10
          md:pt-24
          lg:justify-center
          lg:px-20
          lg:py-24
        "
      >
        <div
          className="
            relative
            h-[43dvh]
            min-h-[270px]
            shrink-0
            lg:h-auto
            lg:min-h-0
            lg:flex-1
          "
        >
          <AnimatePresence mode="wait">
            {displayedSlide === 0 && (
              <motion.div
                key="slide-1"
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{
                  opacity: isFrameAnimating ? 0.38 : 1,
                  filter: isFrameAnimating
                    ? "blur(5px)"
                    : "blur(0px)",
                }}
                exit={{ opacity: 0, filter: "blur(8px)" }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  absolute
                  inset-0
                  grid
                  grid-cols-1
                  items-start
                  lg:grid-cols-[minmax(420px,1fr)_minmax(340px,0.82fr)]
                  lg:items-center
                  lg:gap-16
                "
              >
                <div
                  aria-hidden="true"
                  className="hidden h-[72vh] min-h-[520px] lg:block"
                />

                <div
                  className="
                    mx-auto
                    flex
                    w-full
                    max-w-xl
                    flex-col
                    items-center
                    rounded-[18px]
                    bg-black/86
                    px-3
                    py-4
                    text-center
                    lg:mx-0
                    lg:items-start
                    lg:bg-transparent
                    lg:p-0
                    lg:text-left
                  "
                >
                  <h2
                    className="
                      mb-4
                      whitespace-nowrap
                      font-black
                      uppercase
                      leading-none
                      text-[#E8E9EB]
                      lg:mb-8
                    "
                    style={{
                      fontSize: "clamp(2.1rem, 6vw, 4.5rem)",
                    }}
                  >
                    About me
                  </h2>

                  <p
                    className="
                      max-h-[25dvh]
                      overflow-y-auto
                      pr-1
                      text-[0.82rem]
                      font-light
                      leading-[1.56]
                      text-[#E8E9EB]/75
                      sm:text-[0.9rem]
                      lg:max-h-none
                      lg:overflow-visible
                      lg:pr-0
                      lg:text-[clamp(1rem,1.45vw,1.2rem)]
                      lg:leading-[1.8]
                    "
                  >
                    {BIO_TEXT}
                  </p>
                </div>
              </motion.div>
            )}

            {displayedSlide === 1 && (
              <motion.div
                key="slide-2"
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{
                  opacity: isFrameAnimating ? 0.38 : 1,
                  filter: isFrameAnimating
                    ? "blur(5px)"
                    : "blur(0px)",
                }}
                exit={{ opacity: 0, filter: "blur(8px)" }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  absolute
                  inset-0
                  grid
                  grid-cols-1
                  content-start
                  gap-4
                  rounded-[18px]
                  bg-black/86
                  px-3
                  py-4
                  text-center
                  lg:grid-cols-[minmax(260px,1fr)_minmax(420px,34vw)_minmax(260px,1fr)]
                  lg:content-center
                  lg:items-center
                  lg:gap-10
                  lg:bg-transparent
                  lg:p-0
                  lg:text-left
                "
              >
                <div
                  className="
                    mx-auto
                    flex
                    w-full
                    max-w-[350px]
                    flex-col
                    items-center
                    lg:mx-0
                    lg:items-start
                  "
                >
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

                <div
                  className="
                    mx-auto
                    flex
                    w-full
                    max-w-[390px]
                    flex-col
                    items-center
                    lg:mx-0
                    lg:items-end
                    lg:text-right
                  "
                >
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
            )}

            {displayedSlide === 2 && (
              <motion.div
                key="slide-3"
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{
                  opacity: isFrameAnimating ? 0.38 : 1,
                  filter: isFrameAnimating
                    ? "blur(5px)"
                    : "blur(0px)",
                }}
                exit={{ opacity: 0, filter: "blur(8px)" }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  absolute
                  inset-0
                  grid
                  grid-cols-1
                  items-start
                  rounded-[18px]
                  bg-black/86
                  px-3
                  py-4
                  lg:grid-cols-[minmax(340px,0.9fr)_minmax(420px,1.1fr)]
                  lg:items-center
                  lg:gap-20
                  lg:bg-transparent
                  lg:p-0
                "
              >
                <div className="mx-auto w-full max-w-2xl lg:mx-0">
                  <h2
                    className="
                      mb-4
                      text-center
                      font-black
                      uppercase
                      leading-none
                      text-[#E8E9EB]
                      lg:mb-10
                      lg:text-left
                    "
                    style={{
                      fontSize: "clamp(2.1rem, 6vw, 4.5rem)",
                    }}
                  >
                    Experience
                  </h2>

                  <div className="flex flex-col">
                    {EXPERIENCE.map((job, index) => (
                      <motion.div
                        key={`${job.role}-${job.company}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.45,
                          delay: index * 0.06,
                        }}
                        className="
                          grid
                          grid-cols-[minmax(0,1fr)_auto]
                          gap-3
                          border-b
                          border-[#E8E9EB]/15
                          py-2.5
                          lg:gap-5
                          lg:py-5
                        "
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
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  className="hidden h-[72vh] min-h-[520px] lg:block"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          className="
            absolute
            bottom-3
            left-1/2
            z-40
            flex
            -translate-x-1/2
            items-center
            justify-center
            gap-3
            lg:relative
            lg:bottom-auto
            lg:left-auto
            lg:translate-x-0
            lg:gap-4
            lg:pt-6
          "
        >
          {Array.from({ length: SLIDE_COUNT }).map((_, index) => {
            const isActive = activeSlide === index;

            return (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Slide ${index + 1}`}
                disabled={isFrameAnimating}
                className="
                  relative
                  flex
                  size-9
                  items-center
                  justify-center
                  rounded-full
                  disabled:cursor-default
                  lg:size-10
                "
              >
                <motion.span
                  animate={{
                    scale: isActive ? 1 : 0.78,
                    opacity: isActive ? 0.7 : 0.2,
                  }}
                  className="absolute size-7 rounded-full border border-[#E8E9EB]/45 lg:size-8"
                />
                <motion.span
                  animate={{
                    width: isActive ? 10 : 6,
                    height: isActive ? 10 : 6,
                    opacity: isActive ? 1 : 0.5,
                  }}
                  className="relative rounded-full bg-[#E8E9EB]"
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}