import { motion } from "framer-motion";

interface WorkCategory {
  number: string;
  title: string;
}

const ROW_ONE: WorkCategory[] = [
  { number: "01", title: "POSTER DESIGN" },
  { number: "02", title: "KEY VISUALS" },
  { number: "03", title: "MOTION GRAPHICS" },
  { number: "04", title: "SOCIAL MEDIA" },
  { number: "05", title: "BRAND IDENTITY" },
];

const ROW_TWO: WorkCategory[] = [
  { number: "06", title: "VIDEO EDITING" },
  { number: "07", title: "3D VISUALS" },
  { number: "08", title: "WEBSITE UI" },
  { number: "09", title: "SIGNAGE" },
  { number: "10", title: "CAMPAIGN DESIGN" },
];

interface MarqueeRowProps {
  items: WorkCategory[];
  reverse?: boolean;
  duration?: number;
}

function MarqueeRow({
  items,
  reverse = false,
  duration = 30,
}: MarqueeRowProps) {
  const repeatedItems = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-6 md:py-8">
      {/* Fade mép trái */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-[#080808] to-transparent md:w-32" />

      {/* Fade mép phải */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-[#080808] to-transparent md:w-32" />

      <motion.div
        className="flex w-max items-center gap-4 px-3 md:gap-6 md:px-5"
        style={{
          animation: `${reverse ? "marquee-right" : "marquee-left"} ${duration}s linear infinite`,
          willChange: "transform",
        }}
      >
        {repeatedItems.map((item, index) => (
          <WorkCard key={`${item.number}-${index}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

interface WorkCardProps {
  item: WorkCategory;
}

function WorkCard({ item }: WorkCardProps) {
  return (
    <motion.article
      whileHover={{ y: -7, scale: 1.008 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className="group relative h-[190px] w-[330px] shrink-0 overflow-hidden rounded-[24px] border border-[#E8E9EB]/10 bg-[#E8E9EB]/[0.025] sm:w-[390px] md:h-[230px] md:w-[470px] lg:w-[540px]"
    >
      {/* Nền tối có chiều sâu */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E8E9EB]/[0.035] via-transparent to-black/35" />

      {/* Pattern chìm */}
      <div
        className="absolute inset-0 opacity-[0.035] transition-opacity duration-500 group-hover:opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(
              120deg,
              transparent 0%,
              transparent 38%,
              rgba(232,233,235,0.5) 38.5%,
              transparent 39%,
              transparent 66%,
              rgba(232,233,235,0.35) 66.5%,
              transparent 67%
            )
          `,
          backgroundSize: "190px 190px",
        }}
      />

      {/* Glow nhẹ khi hover */}
      <div className="absolute -right-20 -top-24 size-64 rounded-full bg-[#E8E9EB]/5 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
        {/* Index */}
        <div className="flex items-center gap-3">
          <span className="shrink-0 text-[10px] font-bold tracking-[0.32em] text-[#E8E9EB]/45 md:text-xs">
            {item.number} / WORK
          </span>

          <div className="h-px flex-1 origin-left bg-gradient-to-r from-[#E8E9EB]/20 to-transparent transition-transform duration-500 group-hover:scale-x-105" />
        </div>

        {/* Title và HUD node */}
        <div className="flex items-end justify-between gap-6">
          <h3
            className="whitespace-nowrap font-black uppercase leading-none text-[#E8E9EB] transition-transform duration-500 group-hover:translate-x-1"
            style={{ fontSize: "clamp(1.45rem, 2.2vw, 2.25rem)" }}
          >
            {item.title}
          </h3>

          <div className="relative flex size-10 shrink-0 items-center justify-center">
            <div className="absolute size-9 rounded-full border border-[#E8E9EB]/10 transition-all duration-500 group-hover:rotate-45 group-hover:scale-110 group-hover:border-[#E8E9EB]/25" />

            <div className="absolute size-6 rounded-full border border-[#E8E9EB]/20" />

            <div className="size-1.5 rounded-full bg-[#E8E9EB]/75 shadow-[0_0_10px_rgba(232,233,235,0.35)] transition-transform duration-300 group-hover:scale-125" />
          </div>
        </div>
      </div>

      {/* Scan line đáy */}
      <div className="absolute inset-x-8 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-[#E8E9EB]/55 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
    </motion.article>
  );
}

export default function MarqueeSection() {
  return (
    <section
      id="marquee"
      className="relative overflow-hidden bg-[#080808] py-24 md:py-32"
    >
      {/* Header */}
      <div className="mb-12 px-6 md:px-10 lg:px-20">
        <div className="flex items-center gap-5">
          <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#E8E9EB]/35">
            Selected fields
          </span>

          <div className="h-px max-w-40 flex-1 bg-gradient-to-r from-[#E8E9EB]/30 to-transparent" />
        </div>

        <h2
          className="mt-5 font-black uppercase leading-none text-[#E8E9EB]"
          style={{ fontSize: "clamp(2.6rem, 7vw, 6.5rem)" }}
        >
          My Expertise
        </h2>
      </div>

      {/* Hai hàng chạy ngược hướng */}
      <div className="flex flex-col gap-4 md:gap-6">
        <MarqueeRow items={ROW_ONE} duration={34} />
        <MarqueeRow items={ROW_TWO} reverse duration={38} />
      </div>
    </section>
  );
}
