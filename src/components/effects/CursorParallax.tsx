import { useEffect, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CursorParallaxProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export default function CursorParallax({
  children,
  strength = 24,
  className,
}: CursorParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 120, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 120, damping: 18, mass: 0.6 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const relX = (e.clientX - centerX) / (rect.width / 2);
      const relY = (e.clientY - centerY) / (rect.height / 2);

      const clampedX = Math.max(-1, Math.min(1, relX));
      const clampedY = Math.max(-1, Math.min(1, relY));

      x.set(clampedX * strength);
      y.set(clampedY * strength * 0.6);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [strength, x, y]);

  return (
    <div ref={containerRef} className={className}>
      <motion.div style={{ x: springX, y: springY }}>{children}</motion.div>
    </div>
  );
}
