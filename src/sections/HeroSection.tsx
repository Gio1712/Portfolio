import FadeIn from "../components/effects/FadeIn";
import Starfield from "../components/background/Starfield";
import ContactButton from "../components/buttons/ContactButton";
import CursorParallax from "../components/effects/CursorParallax";

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative flex h-[100dvh] min-h-[640px] flex-col overflow-x-clip"
    >
      <button
        type="button"
        onClick={() => onNavigate("home")}
        aria-label="Back to home"
        className="
          absolute left-5 top-5 z-30 opacity-90
          transition-all duration-300 hover:scale-[1.06] hover:opacity-100
          sm:left-6 sm:top-6 md:left-10 md:top-5
        "
      >
        <div
          className="h-10 w-10 sm:h-11 sm:w-11 md:h-14 md:w-14 lg:h-16 lg:w-16"
          style={{
            background:
              "linear-gradient(180deg, #646973 0%, #bbccd7 100%)",
            WebkitMask:
              "url('/logo/Logo.svg') center / contain no-repeat",
            mask:
              "url('/logo/Logo.svg') center / contain no-repeat",
          }}
        />
      </button>

      {/* Background */}
      <div className="absolute inset-0">
        <Starfield />
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex h-full flex-col pt-[88px] pb-4 md:pb-6">
        <div className="relative flex flex-1 flex-col md:justify-between">
          {/* Hero heading */}
          <div className="overflow-hidden pt-2">
            <FadeIn delay={0.15} y={40}>
              <h1
                className="
                  hero-heading
                  mt-6
                  w-full
                  whitespace-nowrap
                  text-center
                  text-[14vw]
                  font-black
                  uppercase
                  leading-none
                  tracking-tight
                  sm:mt-4
                  sm:text-[15vw]
                  md:-mt-5
                  md:text-[16vw]
                  lg:text-[17.5vw]
                "
              >
                Hi, i&apos;m Dat
              </h1>
            </FadeIn>
          </div>

          {/* Avatar — mobile */}
          <div className="relative flex min-h-0 flex-1 items-end justify-center pb-[clamp(2.75rem,7dvh,4.75rem)] md:hidden">
            <div className="relative">
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-x-[-10%]
                  bottom-[2%]
                  top-[8%]
                  -z-10
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-[#E8E9EB]/10
                  bg-gradient-to-br
                  from-[#E8E9EB]/[0.08]
                  via-[#8A6CFF]/[0.05]
                  to-[#111318]/[0.16]
                  shadow-[0_20px_70px_rgba(0,0,0,0.32)]
                  backdrop-blur-xl
                  [mask-image:linear-gradient(to_bottom,black_0%,black_78%,rgba(0,0,0,0.7)_90%,transparent_100%)]
                  [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_78%,rgba(0,0,0,0.7)_90%,transparent_100%)]
                "
              />

              <img
                src="/models/avatar.webp"
                alt="M.Đạt portrait"
                className="
                  relative
                  h-[45dvh]
                  max-h-[520px]
                  w-auto
                  object-contain
                  [mask-image:linear-gradient(to_bottom,black_0%,black_82%,rgba(0,0,0,0.72)_91%,transparent_100%)]
                  [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_82%,rgba(0,0,0,0.72)_91%,transparent_100%)]
                "
              />
            </div>
          </div>

          {/* Avatar — desktop, di chuyển cùng panel */}
          <CursorParallax
            strength={35}
            className="
              hidden
              md:absolute
              md:right-0
              md:top-0
              md:flex
              md:h-full
              md:w-1/2
              md:items-end
              md:justify-center
            "
          >
            <div
              className="
                relative
                flex
                h-full
                w-full
                max-w-[980px]
                items-end
                justify-center
              "
            >
              {/* Ambient glow */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  bottom-[10%]
                  left-1/2
                  h-[58%]
                  w-[76%]
                  -translate-x-1/2
                  rounded-[50%]
                  bg-[radial-gradient(circle_at_center,rgba(130,94,255,0.18),rgba(82,111,255,0.08)_38%,transparent_72%)]
                  blur-3xl
                "
              />

              {/* Main HUD glass panel */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  bottom-[1%]
                  left-1/2
                  h-[92%]
                  w-[88%]
                  -translate-x-1/2
                  overflow-hidden
                  rounded-[34px]
                  border
                  border-[#E8E9EB]/10
                  bg-gradient-to-br
                  from-[#E8E9EB]/[0.07]
                  via-[#8467FF]/[0.05]
                  to-[#0C0E12]/[0.18]
                  shadow-[0_28px_90px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.06)]
                  backdrop-blur-[15px]
                  backdrop-saturate-[1.08]
                  [mask-image:linear-gradient(to_bottom,black_0%,black_74%,rgba(0,0,0,0.78)_86%,rgba(0,0,0,0.28)_96%,transparent_100%)]
                  [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_74%,rgba(0,0,0,0.78)_86%,rgba(0,0,0,0.28)_96%,transparent_100%)]
                "
              >
                {/* Internal gradient wash + aura over background text */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_22%_18%,rgba(224,208,255,0.18),transparent_30%),radial-gradient(circle_at_76%_30%,rgba(104,132,255,0.16),transparent_34%),radial-gradient(circle_at_52%_72%,rgba(255,132,88,0.10),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.008)_42%,rgba(5,7,11,0.18)_100%)]
                  "
                />

                {/* Soft aura: cho cảm giác có nội dung nằm sau lớp kính */}
                <div
                  className="
                    absolute
                    -left-[14%]
                    top-[10%]
                    h-[38%]
                    w-[62%]
                    rounded-[50%]
                    bg-[radial-gradient(circle,rgba(170,130,255,0.20)_0%,rgba(114,96,255,0.10)_42%,transparent_74%)]
                    blur-2xl
                  "
                />

                <div
                  className="
                    absolute
                    -right-[10%]
                    top-[28%]
                    h-[34%]
                    w-[54%]
                    rounded-[50%]
                    bg-[radial-gradient(circle,rgba(112,158,255,0.18)_0%,rgba(70,106,255,0.08)_44%,transparent_76%)]
                    blur-2xl
                  "
                />

                {/* Fine grid */}
                <div
                  className="
                    absolute
                    inset-0
                    opacity-[0.13]
                    [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
                    [background-size:36px_36px]
                  "
                />

                {/* Left vertical HUD label — dot, text và line cùng một trục */}
                <div
                  className="
                    absolute
                    left-6
                    top-7
                    flex
                    h-[44%]
                    w-4
                    flex-col
                    items-center
                  "
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-[#E8E9EB]/65" />

                  <span
                    className="
                      mt-3
                      shrink-0
                      text-[9px]
                      uppercase
                      tracking-[0.28em]
                      text-[#E8E9EB]/35
                      [writing-mode:vertical-rl]
                      [text-orientation:mixed]
                    "
                  >
                    AVATAR / HERO
                  </span>

                  <div
                    className="
                      mt-3
                      w-px
                      flex-1
                      bg-gradient-to-b
                      from-[#E8E9EB]/30
                      to-transparent
                    "
                  />
                </div>

                {/* Right vertical HUD label — line, text và dot cùng một trục */}
                <div
                  className="
                    absolute
                    bottom-8
                    right-6
                    flex
                    h-[38%]
                    w-4
                    flex-col
                    items-center
                  "
                >
                  <div
                    className="
                      mb-3
                      w-px
                      flex-1
                      bg-gradient-to-b
                      from-transparent
                      to-[#E8E9EB]/30
                    "
                  />

                  <span
                    className="
                      shrink-0
                      text-[8px]
                      uppercase
                      tracking-[0.24em]
                      text-[#E8E9EB]/45
                      [writing-mode:vertical-rl]
                      [text-orientation:mixed]
                      [writing-mode:vertical-rl]
                      scale-y-[1]
                    "
                  >
                    VISUAL SYSTEM
                  </span>

                  <span className="mt-3 size-1.5 shrink-0 rounded-full border border-[#E8E9EB]/35" />
                </div>

                {/* Corner brackets */}
                <span className="absolute left-4 top-4 size-5 border-l border-t border-[#E8E9EB]/30" />
                <span className="absolute right-4 top-4 size-5 border-r border-t border-[#E8E9EB]/30" />
                <span className="absolute bottom-4 left-4 size-5 border-b border-l border-[#E8E9EB]/30" />
                <span className="absolute bottom-4 right-4 size-5 border-b border-r border-[#E8E9EB]/30" />
              </div>

              {/* Avatar */}
              <img
                src="/models/avatar.webp"
                alt="M.Đạt portrait"
                className="
                  relative
                  z-10
                  h-[86vh]
                  max-h-[860px]
                  w-auto
                  object-contain
                  drop-shadow-[0_24px_50px_rgba(0,0,0,0.28)]
                  [mask-image:linear-gradient(to_bottom,black_0%,black_79%,rgba(0,0,0,0.78)_89%,rgba(0,0,0,0.22)_97%,transparent_100%)]
                  [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_79%,rgba(0,0,0,0.78)_89%,rgba(0,0,0,0.22)_97%,transparent_100%)]
                "
              />
            </div>
          </CursorParallax>

          {/* Bottom content */}
          <div
            className="
              relative
              z-20
              flex
              items-end
              justify-between
              px-6
              sm:px-6
              md:px-10
            "
          >
            <FadeIn delay={0.35} y={20}>
              <p
                className="
                  max-w-[280px]
                  font-light
                  uppercase
                  leading-snug
                  tracking-wide
                  text-[#E8E9EB]
                  sm:max-w-[360px]
                  md:max-w-[420px]
                "
                style={{ fontSize: "clamp(0.65rem, 1.2vw, 1.3rem)" }}
              >
                Crafting visuals that transform ideas into brand stories, from
                identity systems to dynamic motion.
              </p>
            </FadeIn>

            <FadeIn delay={0.5} y={20}>
              <div onClick={() => onNavigate("contact")}>
                <ContactButton />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
