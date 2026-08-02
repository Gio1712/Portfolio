interface LiveProjectButtonProps {
  className?: string;
}

export default function LiveProjectButton({
  className = "",
}: LiveProjectButtonProps) {
  return (
    <button
      className={`rounded-full border-2 border-[#E8E9EB] px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest text-[#E8E9EB] transition-colors duration-200 hover:bg-[#E8E9EB]/10 ${className}`}
    >
      Live Project
    </button>
  );
}
