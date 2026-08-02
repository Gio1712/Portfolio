import { motion } from "framer-motion";

import FadeIn from "../components/effects/FadeIn";
import { SERVICES } from "../data/services";

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="
        relative
        overflow-hidden
        rounded-t-[40px]
        bg-[#0a0a0a]
        px-5
        py-20
        text-[#E8E9EB]
        sm:rounded-t-[50px]
        sm:px-8
        sm:py-24
        md:rounded-t-[60px]
        md:px-10
        md:py-32
      "
    >
      {/* =========================
          BACKGROUND HUD
      ========================= */}
      <div className="pointer-events-none absolute inset-0">
        {/* Radial depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.055), transparent 52%)",
          }}
        />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(232,233,235,0.45) 1px, transparent 1px),
              linear-gradient(90deg, rgba(232,233,235,0.45) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
          }}
        />

        {/* Scan glow */}
        <div
          className="
            absolute
            left-1/2
            top-0
            h-40
            w-[70vw]
            -translate-x-1/2
            bg-gradient-to-b
            from-[#E8E9EB]/[0.035]
            to-transparent
            blur-3xl
          "
        />
      </div>

      {/* =========================
          CONTENT
      ========================= */}
      <div className="relative z-10">
        <FadeIn delay={0} y={30}>
          <div className="mx-auto mb-16 max-w-5xl sm:mb-20 md:mb-28">
            <div className="mb-5 flex items-center gap-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#E8E9EB]/35">
                SYS / SERVICES
              </span>

              <div className="h-px flex-1 bg-gradient-to-r from-[#E8E9EB]/25 to-transparent" />
            </div>

            <h2
              className="
                text-center
                font-black
                uppercase
                leading-none
                text-[#F4F5F6]
              "
              style={{
                fontSize: "clamp(3rem, 12vw, 160px)",
              }}
            >
              What I Do
            </h2>
          </div>
        </FadeIn>

        <div className="mx-auto max-w-5xl">
          {SERVICES.map((service, index) => (
            <FadeIn key={service.number} delay={index * 0.08} y={24}>
              <motion.article
                whileHover={{
                  x: 6,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 24,
                }}
                className="
                  group
                  relative
                  grid
                  grid-cols-[92px_1fr]
                  gap-5
                  border-b
                  border-[#E8E9EB]/10
                  py-8
                  sm:grid-cols-[120px_1fr]
                  sm:gap-8
                  sm:py-10
                  md:grid-cols-[170px_1fr_auto]
                  md:gap-10
                  md:py-12
                "
              >
                {/* Number */}
                <div className="relative flex items-start">
                  <span
                    className="
                      font-black
                      leading-none
                      text-[#E8E9EB]/10
                      transition-all
                      duration-500
                      group-hover:text-[#E8E9EB]/18
                    "
                    style={{
                      fontSize: "clamp(3rem, 8vw, 110px)",
                    }}
                  >
                    {service.number}
                  </span>

                  <span
                    className="
                      absolute
                      left-0
                      top-0
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.3em]
                      text-[#E8E9EB]/35
                    "
                  >
                    SVC
                  </span>
                </div>

                {/* Main content */}
                <div className="flex flex-col justify-center gap-4">
                  <div className="flex items-center gap-4">
                    <h3
                      className="
                        font-semibold
                        uppercase
                        text-[#F1F2F3]
                        transition-transform
                        duration-500
                        group-hover:translate-x-1
                      "
                      style={{
                        fontSize: "clamp(1rem, 2.2vw, 2.1rem)",
                      }}
                    >
                      {service.name}
                    </h3>

                    <div
                      className="
                        h-px
                        flex-1
                        origin-left
                        scale-x-40
                        bg-gradient-to-r
                        from-[#E8E9EB]/30
                        to-transparent
                        transition-transform
                        duration-500
                        group-hover:scale-x-100
                      "
                    />
                  </div>

                  <p
                    className="
                      max-w-2xl
                      font-light
                      leading-relaxed
                      text-[#E8E9EB]/55
                    "
                    style={{
                      fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)",
                    }}
                  >
                    {service.description}
                  </p>

                  {/* HUD metadata */}
                  <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#E8E9EB]/30">
                      STATUS
                    </span>

                    <span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.24em] text-[#E8E9EB]/55">
                      <span className="size-1.5 rounded-full bg-[#E8E9EB]/70 shadow-[0_0_10px_rgba(232,233,235,0.28)]" />
                      Available
                    </span>

                    <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#E8E9EB]/25">
                      MODULE / 0{index + 1}
                    </span>
                  </div>
                </div>

                {/* HUD node */}
                <div className="hidden items-center justify-end md:flex">
                  <div className="relative flex size-12 items-center justify-center">
                    <motion.div
                      className="absolute size-10 rounded-full border border-[#E8E9EB]/10"
                      whileHover={{
                        rotate: 90,
                        scale: 1.08,
                      }}
                      transition={{
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />

                    <div className="absolute size-6 rounded-full border border-[#E8E9EB]/20" />

                    <div
                      className="
                        size-2
                        rounded-full
                        bg-[#E8E9EB]/70
                        shadow-[0_0_12px_rgba(232,233,235,0.28)]
                        transition-all
                        duration-300
                        group-hover:scale-125
                        group-hover:bg-[#E8E9EB]
                      "
                    />
                  </div>
                </div>

                {/* Hover glow */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-y-4
                    left-[20%]
                    right-0
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                  style={{
                    background:
                      "radial-gradient(circle at 30% 50%, rgba(232,233,235,0.04), transparent 60%)",
                  }}
                />
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
