interface ContactButtonProps {
  className?: string;
  small?: boolean;
}

export default function ContactButton({
  className = "",
  small = false,
}: ContactButtonProps) {
  const sizeClasses = small
    ? "px-4 py-1.5 md:px-6 md:py-2 text-sm md:text-lg lg:text-[1.4rem]"
    : "px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base";

  return (
    <button
      className={`rounded-full ${sizeClasses} font-medium uppercase tracking-widest text-[#E8E9EB] bg-[#E8E9EB]/10 ${className}`}
      style={{
        boxShadow:
          "inset 0 1px 1px rgba(215, 226, 234, 0.25), 0 8px 24px rgba(0, 0, 0, 0.35)",
      }}
    >
      Contact Me
    </button>
  );
}
