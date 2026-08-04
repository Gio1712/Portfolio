import { ArrowUpRight, Mail } from "lucide-react";
import { motion } from "framer-motion";

import FadeIn from "../components/effects/FadeIn";

const CONTACT_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/buiminhdat1712/",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/m.dat.1712/",
  },
  {
    label: "Zalo: +84 337 589 760",
    href: "https://zalo.me/0337589760",
  },
  {
    label: "Phone number: +84 337 589 760",
    href: "tel:+84337589760",
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="
        relative
        flex
        min-h-[100dvh]
        overflow-hidden
        bg-[#080808]
        px-5
        py-8
        text-[#E8E9EB]
        sm:px-8
        sm:py-10
        md:px-10
        md:py-12
      "
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 15%, rgba(232,233,235,0.06), transparent 46%)",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(232,233,235,0.35) 1px, transparent 1px),
              linear-gradient(90deg, rgba(232,233,235,0.35) 1px, transparent 1px)
            `,
            backgroundSize: "76px 76px",
          }}
        />

        <div
          className="
            absolute
            left-1/2
            top-1/3
            h-[420px]
            w-[70vw]
            -translate-x-1/2
            rounded-full
            bg-[#E8E9EB]/[0.035]
            blur-[120px]
          "
        />
      </div>

      <div className="relative z-10 mx-auto grid min-h-0 w-full max-w-[1600px] flex-1 grid-rows-[auto_1fr_auto] gap-5">
        {/* Header */}
        <FadeIn delay={0} y={28}>
          <div>
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.34em] text-[#E8E9EB]/35">
                SYS / CONTACT
              </span>

              <div className="h-px flex-1 bg-gradient-to-r from-[#E8E9EB]/25 to-transparent" />

              <a
                href="#home"
                aria-label="Back to home"
                className="
                  flex shrink-0 items-center justify-center opacity-90
                  transition-all duration-300 hover:scale-[1.06] hover:opacity-100
                "
              >
                <div
                  className="h-8 w-8 sm:h-9 sm:w-9 md:h-11 md:w-11 lg:h-12 lg:w-12"
                  style={{
                    background:
                      "linear-gradient(180deg, #646973 0%, #bbccd7 100%)",
                    WebkitMask:
                      "url('/logo/Logo.svg') center / contain no-repeat",
                    mask:
                      "url('/logo/Logo.svg') center / contain no-repeat",
                  }}
                />
              </a>
            </div>

            <h2
              className="
                mt-4 sm:mt-5
                max-w-[1200px]
                font-black
                uppercase
                leading-[0.88]
                text-[#F4F5F6]
              "
              style={{
                fontSize: "clamp(3.2rem, 10.5vw, 9rem)",
              }}
            >
              Let&apos;s
              <br />
              create
            </h2>
          </div>
        </FadeIn>

        {/* Main contact */}
        <div className="grid min-h-0 content-center gap-7 md:grid-cols-[1.15fr_0.85fr] md:items-end md:gap-10">
          <FadeIn delay={0.1} y={24}>
            <div>
              <p className="max-w-xl text-base font-light leading-relaxed text-[#E8E9EB]/55 md:text-lg">
                Have a project, collaboration, or visual idea in mind?
                Let&apos;s turn it into something clear, memorable, and alive.
              </p>

              <motion.a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=buiminhdat1712@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  x: 8,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 24,
                }}
                className="
                  group
                  mt-5
                  inline-flex
                  items-center
                  gap-4
                  rounded-full
                  border
                  border-[#E8E9EB]/20
                  bg-[#E8E9EB]/[0.035]
                  px-4
                  py-3
                  sm:px-5
                  text-sm
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-[#E8E9EB]
                  backdrop-blur-md
                  transition-colors
                  duration-300
                  hover:border-[#E8E9EB]/45
                  hover:bg-[#E8E9EB]/[0.06]
                "
              >
                <Mail size={18} />
                buiminhdat1712@gmail.com
                <ArrowUpRight
                  size={17}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                />
              </motion.a>
            </div>
          </FadeIn>

          <FadeIn delay={0.18} y={24}>
            <div className="flex flex-col gap-1 sm:gap-2 md:ml-8 lg:ml-12 lg:mr-4">
              {CONTACT_LINKS.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  whileHover={{
                    x: -6,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 24,
                  }}
                  className="
                      group
                      flex
                      items-center
                      justify-between
                      border-b
                      border-[#E8E9EB]/10
                      px-1 py-2 sm:px-2 sm:py-2.5 md:px-3 md:py-3
                    "
                >
                  <div className="flex items-center gap-4">
                    <span className="shrink-0 text-[8px] font-bold uppercase tracking-[0.22em] text-[#E8E9EB]/25 sm:text-[9px] sm:tracking-[0.28em]">
                      0{index + 1}
                    </span>

                    <span className="min-w-0 truncate text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-[#E8E9EB]/65 transition-colors duration-300 group-hover:text-[#E8E9EB] sm:text-xs sm:tracking-[0.1em] md:text-sm md:tracking-[0.12em]">
                      {link.label}
                    </span>
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="
                        shrink-0
                        text-[#E8E9EB]/30
                        transition-all
                        duration-300
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                        group-hover:text-[#E8E9EB]
                      "
                  />
                </motion.a>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Footer HUD */}
        <div className="flex flex-col gap-3 border-t border-[#E8E9EB]/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex size-8 items-center justify-center">
              <div className="absolute size-7 rounded-full border border-[#E8E9EB]/15" />

              <div className="absolute size-4 rounded-full border border-[#E8E9EB]/25" />

              <div className="size-1.5 rounded-full bg-[#E8E9EB] shadow-[0_0_12px_rgba(232,233,235,0.45)]" />
            </div>

            <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#E8E9EB]/35">
              Available for selected projects
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[9px] font-bold uppercase tracking-[0.26em] text-[#E8E9EB]/25">
              © 2026 M. Dat
            </span>

            <button
              type="button"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="
                group
                flex
                items-center
                gap-2
                text-[9px]
                font-bold
                uppercase
                tracking-[0.28em]
                text-[#E8E9EB]/40
                transition-colors
                duration-300
                hover:text-[#E8E9EB]
              "
            >
              Back to top
              <ArrowUpRight
                size={14}
                className="
                  rotate-[-45deg]
                  transition-transform
                  duration-300
                  group-hover:-translate-y-1
                "
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}