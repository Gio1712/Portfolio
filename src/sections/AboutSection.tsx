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
const WHEEL_TRIGGER = 100;

function clampSlide(index: number) {
  return Math.min(SLIDE_COUNT - 1, Math.max(0, index));
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wheelAccumulatorRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);

  const [activeSlide, setActiveSlide] = useState(0);
  const [currentAvatarFrame, setCurrentAvatarFrame] = useState(
    TARGET_FRAMES[0] ?? 0,
  );

  const [isFrameAnimating, setIsFrameAnimating] = useState(false);

  /*
   * Chỉ hiện content khi sequence đã chạy tới đúng frame đích.
   * Trong lúc model đang xoay, toàn bộ chữ của slide mới vẫn ẩn.
   */
  const targetFrame = TARGET_FRAMES[activeSlide] ?? 0;

  const isContentReady =
    !isFrameAnimating && currentAvatarFrame === targetFrame;

  const goToSlide = useCallback(
    (nextIndex: number) => {
      if (isFrameAnimating) {
        return;
      }

      const nextSlide = clampSlide(nextIndex);

      setActiveSlide((currentSlide) => {
        if (currentSlide === nextSlide) {
          return currentSlide;
        }

        return nextSlide;
      });
    },
    [isFrameAnimating],
  );

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const isSectionActive = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const visibleTop = Math.max(0, rect.top);

      const visibleBottom = Math.min(viewportHeight, rect.bottom);

      const visibleHeight = Math.max(0, visibleBottom - visibleTop);

      return (
        // About phải vào sâu hơn
        rect.top <= viewportHeight * 0.2 &&
        // Và phải hiện tối thiểu 60% màn hình
        visibleHeight >= viewportHeight * 0.75
      );
    };

    const onWheel = (event: WheelEvent) => {
      if (!isSectionActive()) {
        return;
      }

      const direction = Math.sign(event.deltaY);

      const shouldLeaveSection =
        (activeSlide === 0 && direction < 0) ||
        (activeSlide === SLIDE_COUNT - 1 && direction > 0);

      if (shouldLeaveSection) {
        return;
      }

      event.preventDefault();

      /*
       * Trong lúc 120 frame đang chạy, khóa wheel.
       * Nhờ vậy không thể skip từ slide 3 thẳng về slide 1
       * khi sequence giữa vẫn chưa chạy xong.
       */
      if (isFrameAnimating) {
        wheelAccumulatorRef.current = 0;
        return;
      }

      wheelAccumulatorRef.current += event.deltaY;

      if (Math.abs(wheelAccumulatorRef.current) < WHEEL_TRIGGER) {
        return;
      }

      const nextDirection = Math.sign(wheelAccumulatorRef.current);

      wheelAccumulatorRef.current = 0;

      goToSlide(activeSlide + nextDirection);
    };

    const onTouchStart = (event: TouchEvent) => {
      if (!isSectionActive()) {
        return;
      }

      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!isSectionActive() || touchStartYRef.current === null) {
        return;
      }

      const currentY = event.touches[0]?.clientY;

      if (currentY === undefined) {
        return;
      }

      const delta = touchStartYRef.current - currentY;

      if (Math.abs(delta) < 45) {
        return;
      }

      const direction = Math.sign(delta);

      const shouldLeaveSection =
        (activeSlide === 0 && direction < 0) ||
        (activeSlide === SLIDE_COUNT - 1 && direction > 0);

      if (shouldLeaveSection) {
        return;
      }

      event.preventDefault();

      if (isFrameAnimating) {
        return;
      }

      touchStartYRef.current = currentY;
      goToSlide(activeSlide + direction);
    };

    window.addEventListener("wheel", onWheel, {
      passive: false,
    });

    window.addEventListener("touchstart", onTouchStart, {
      passive: true,
    });

    window.addEventListener("touchmove", onTouchMove, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [activeSlide, goToSlide, isFrameAnimating]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="
        relative
        h-screen
        min-h-[680px]
        overflow-hidden
        bg-black
      "
    >
      <AboutModelStage
        activeSlide={activeSlide}
        onFrameChange={setCurrentAvatarFrame}
        onAnimationStateChange={setIsFrameAnimating}
      />

      <div
        className="
          relative
          z-20
          flex
          h-full
          flex-col
          px-6
          py-20
          pt-28
          md:px-10
          lg:justify-center
          lg:px-20
          lg:py-24
          lg:pt-24
        "
      >
        <div className="relative min-h-0 flex-1">
          <AnimatePresence mode="wait">
            {activeSlide === 0 && isContentReady && (
              <motion.div
                key="slide-1"
                initial={{
                  opacity: 0,
                  filter: "blur(10px)",
                }}
                animate={{
                  opacity: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  filter: "blur(8px)",
                }}
                transition={{
                  duration: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  absolute
                  inset-0
                  grid
                  w-full
                  grid-cols-1
                  items-center
                  gap-10
                  lg:grid-cols-[minmax(420px,1fr)_minmax(340px,0.82fr)]
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
                    justify-center
                    text-center
                    lg:mx-0
                    lg:items-start
                    lg:text-left
                  "
                >
                  <h2
                    className="
                      mb-8
                      whitespace-nowrap
                      font-black
                      uppercase
                      leading-none
                      text-[#E8E9EB]
                    "
                    style={{
                      fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                    }}
                  >
                    About me
                  </h2>

                  <p
                    className="
                      font-light
                      leading-[1.8]
                      text-[#E8E9EB]/75
                    "
                    style={{
                      fontSize: "clamp(1rem, 1.45vw, 1.2rem)",
                    }}
                  >
                    {BIO_TEXT}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {activeSlide === 1 && isContentReady && (
              <motion.div
                key="slide-2"
                initial={{
                  opacity: 0,
                  filter: "blur(10px)",
                }}
                animate={{
                  opacity: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  filter: "blur(8px)",
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  absolute
                  inset-0
                  grid
                  h-full
                  w-full
                  grid-cols-1
                  content-start
                  items-center
                  gap-10
                  lg:grid-cols-[minmax(260px,1fr)_minmax(420px,34vw)_minmax(260px,1fr)]
                  lg:content-center
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
                    text-center
                    lg:mx-0
                    lg:items-start
                    lg:text-left
                  "
                >
                  <p className="text-base font-bold uppercase tracking-[0.08em] text-[#E8E9EB] md:text-lg">
                    FPT UNIVERSITY
                  </p>

                  <p className="mt-3 text-sm text-[#E8E9EB]/65 md:text-base">
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
                    text-center
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
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {activeSlide === 2 && isContentReady && (
              <motion.div
                key="slide-3"
                initial={{
                  opacity: 0,
                  filter: "blur(10px)",
                }}
                animate={{
                  opacity: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  filter: "blur(8px)",
                }}
                transition={{
                  duration: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  absolute
                  inset-0
                  grid
                  w-full
                  grid-cols-1
                  items-center
                  gap-10
                  lg:grid-cols-[minmax(340px,0.9fr)_minmax(420px,1.1fr)]
                  lg:gap-20
                "
              >
                <div className="mx-auto w-full max-w-2xl lg:mx-0">
                  <h2
                    className="
                      mb-10
                      text-center
                      font-black
                      uppercase
                      leading-none
                      text-[#E8E9EB]
                      lg:text-left
                    "
                    style={{
                      fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                    }}
                  >
                    Experience
                  </h2>

                  <div className="flex flex-col">
                    {EXPERIENCE.map((job, index) => (
                      <motion.div
                        key={`${job.role}-${job.company}`}
                        initial={{
                          opacity: 0,
                          y: 12,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.55,
                          delay: index * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="
                          grid
                          grid-cols-[minmax(0,1fr)_auto]
                          gap-5
                          border-b
                          border-[#E8E9EB]/15
                          py-5
                        "
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-bold uppercase text-[#E8E9EB] md:text-base">
                            {job.role}
                          </p>

                          <p className="mt-1 text-sm text-[#E8E9EB]/55">
                            {job.company}
                          </p>
                        </div>

                        <span className="whitespace-nowrap pt-0.5 text-xs text-[#E8E9EB]/45 md:text-sm">
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
            relative
            z-40
            flex
            shrink-0
            items-center
            justify-center
            gap-4
            pt-6
          "
        >
          {Array.from({
            length: SLIDE_COUNT,
          }).map((_, index) => {
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
                  size-10
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-full
                  disabled:cursor-default
                "
              >
                <motion.span
                  animate={{
                    scale: isActive ? 1 : 0.78,
                    opacity: isActive ? 0.7 : 0.2,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute size-8 rounded-full border border-[#E8E9EB]/45"
                />

                <motion.span
                  animate={{
                    width: isActive ? 10 : 6,
                    height: isActive ? 10 : 6,
                    opacity: isActive ? 1 : 0.5,
                  }}
                  transition={{
                    duration: 0.35,
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
