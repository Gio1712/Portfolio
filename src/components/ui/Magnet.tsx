import {
  useRef,
  useState,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from "react";

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className,
}: MagnetProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = wrapperRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;

    const withinX = Math.abs(distX) < rect.width / 2 + padding;
    const withinY = Math.abs(distY) < rect.height / 2 + padding;

    if (withinX && withinY) {
      setIsActive(true);
      setTranslate({ x: distX / strength, y: distY / strength });
    } else {
      setIsActive(false);
      setTranslate({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setIsActive(false);
    setTranslate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={wrapperRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${translate.x}px, ${translate.y}px, 0)`,
        transition: isActive ? activeTransition : inactiveTransition,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
