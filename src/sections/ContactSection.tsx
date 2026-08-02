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
        min-h-screen
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

      <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-[1600px] flex-col justify-between">
        {/* Header */}
        <FadeIn delay={0} y={28}>
          <div>
            <div className="flex items-center gap-4">
              <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.34em] text-[#E8E9EB]/35">
                SYS / CONTACT
              </span>

              <div className="h-px flex-1 bg-gradient-to-r from-[#E8E9EB]/25 to-transparent" />
            </div>

            <h2
              className="
                mt-7
                max-w-[1200px]
                font-black
                uppercase
                leading-[0.88]
                text-[#F4F5F6]
              "
              style={{
                fontSize: "clamp(4rem, 13vw, 12rem)",
              }}
            >
              Let&apos;s
              <br />
              create
            </h2>
          </div>
        </FadeIn>

        {/* Main contact */}
        <div className="mt-16 grid gap-12 md:grid-cols-[1.3fr_0.7fr] md:items-end">
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
                  mt-9
                  inline-flex
                  items-center
                  gap-4
                  rounded-full
                  border
                  border-[#E8E9EB]/20
                  bg-[#E8E9EB]/[0.035]
                  px-6
                  py-4
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
            <div className="flex flex-col gap-3">
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
                      py-4
                    "
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#E8E9EB]/25">
                      0{index + 1}
                    </span>

                    <span className="text-sm font-semibold uppercase tracking-[0.12em] text-[#E8E9EB]/65 transition-colors duration-300 group-hover:text-[#E8E9EB]">
                      {link.label}
                    </span>
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="
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
        <div className="mt-20 flex flex-col gap-5 border-t border-[#E8E9EB]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
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