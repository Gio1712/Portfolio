import { useEffect, useRef } from "react";

interface Star {
  xFrac: number;
  yFrac: number;
  radius: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  wanderRadius: number;
  wanderSpeed: number;
  wanderPhase: number;
  // eased current push-away offset caused by the cursor, and its target
  pushX: number;
  pushY: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  life: number; // 0 -> 1, fades out as it approaches 1
  speed: number;
}

const STAR_COUNT = 75;
// Roughly one shooting star every ~4-9 seconds (at 60fps)
const SHOOTING_STAR_MIN_GAP = 240;
const SHOOTING_STAR_MAX_GAP = 540;
// How close the cursor needs to be to a star (in px) before it reacts
const HOVER_RADIUS = 70;
const MAX_PUSH = 16;

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const nextShootingStarInRef = useRef(
    SHOOTING_STAR_MIN_GAP +
      Math.random() * (SHOOTING_STAR_MAX_GAP - SHOOTING_STAR_MIN_GAP),
  );
  // mouse position in canvas-local pixels, or null when the cursor is outside
  const localMouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const generateStars = () => {
      const stars: Star[] = [];
      const cols = Math.ceil(Math.sqrt(STAR_COUNT * 1.6));
      const rows = Math.ceil(STAR_COUNT / cols);
      const cellW = 1 / cols;
      const cellH = 1 / rows;
      const jitter = 0.85;

      for (let i = 0; i < STAR_COUNT; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const xFrac = Math.min(
          1,
          Math.max(
            0,
            (col + 0.5) / cols + (Math.random() - 0.5) * jitter * cellW,
          ),
        );
        const yFrac = Math.min(
          1,
          Math.max(
            0,
            (row + 0.5) / rows + (Math.random() - 0.5) * jitter * cellH,
          ),
        );

        const sizeRoll = Math.random();
        const radius =
          sizeRoll < 0.72
            ? Math.random() * 0.5 + 0.3
            : sizeRoll < 0.93
              ? Math.random() * 0.6 + 0.8
              : Math.random() * 0.9 + 1.4;

        stars.push({
          xFrac,
          yFrac,
          radius,
          baseOpacity: Math.random() * 0.5 + 0.4,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
          wanderRadius: Math.random() * 2 + 0.6,
          wanderSpeed: Math.random() * 0.006 + 0.003,
          wanderPhase: Math.random() * Math.PI * 2,
          pushX: 0,
          pushY: 0,
        });
      }
      return stars;
    };

    // Positions are stored as fractions of the canvas size, so resizing the
    // container never needs to reroll star positions.
    starsRef.current = generateStars();

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));
      if (canvas.width === width && canvas.height === height) return;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(container);

    const spawnShootingStar = () => {
      const height = canvas.height;
      // Always enters from off-screen left, travels right and slightly downward
      const startX = -80 - Math.random() * 60;
      const startY = Math.random() * height * 0.55;
      const angle = Math.PI / 8 + Math.random() * (Math.PI / 10); // ~22°-40° below horizontal
      const speed = 6 + Math.random() * 4;

      shootingStarsRef.current.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: 70 + Math.random() * 60,
        life: 0,
        speed,
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const inside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
      localMouseRef.current = inside ? { x, y } : null;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = localMouseRef.current;

      for (const star of starsRef.current) {
        const baseX = star.xFrac * canvas.width;
        const baseY = star.yFrac * canvas.height;

        // Idle wander: every star drifts gently in its own small circle,
        // independent of every other star.
        const wanderX = prefersReducedMotion
          ? 0
          : Math.cos(frame * star.wanderSpeed + star.wanderPhase) *
            star.wanderRadius;
        const wanderY = prefersReducedMotion
          ? 0
          : Math.sin(frame * star.wanderSpeed + star.wanderPhase) *
            star.wanderRadius;

        // Hover repulsion: only stars near the cursor get pushed away from it,
        // with a smooth (non-linear) falloff so it doesn't feel like hitting a wall.
        let targetPushX = 0;
        let targetPushY = 0;
        if (mouse && !prefersReducedMotion) {
          const dx = baseX - mouse.x;
          const dy = baseY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < HOVER_RADIUS && dist > 0.001) {
            const t = 1 - dist / HOVER_RADIUS;
            const smooth = t * t * (3 - 2 * t); // smoothstep
            const strength = smooth * MAX_PUSH;
            targetPushX = (dx / dist) * strength;
            targetPushY = (dy / dist) * strength;
          }
        }
        star.pushX += (targetPushX - star.pushX) * 0.06;
        star.pushY += (targetPushY - star.pushY) * 0.06;

        const twinkle = prefersReducedMotion
          ? 1
          : Math.sin(frame * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
        const opacity = star.baseOpacity * twinkle;

        const px = baseX + wanderX + star.pushX;
        const py = baseY + wanderY + star.pushY;

        // Soft glow halo behind the star
        ctx.shadowBlur = star.radius * 6;
        ctx.shadowColor = `rgba(190, 205, 220, ${Math.min(1, opacity + 0.15)})`;

        ctx.beginPath();
        ctx.arc(px, py, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, opacity + 0.1)})`;
        ctx.fill();
      }

      // Shadow only applies to stars above; reset before drawing shooting stars
      ctx.shadowBlur = 0;

      // Shooting stars: spawn on a timer, then update + draw + cull
      if (!prefersReducedMotion) {
        nextShootingStarInRef.current -= 1;
        if (nextShootingStarInRef.current <= 0) {
          spawnShootingStar();
          nextShootingStarInRef.current =
            SHOOTING_STAR_MIN_GAP +
            Math.random() * (SHOOTING_STAR_MAX_GAP - SHOOTING_STAR_MIN_GAP);
        }

        shootingStarsRef.current = shootingStarsRef.current.filter((s) => {
          s.x += s.vx;
          s.y += s.vy;
          s.life += 0.012;

          const offScreen =
            s.x < -s.length ||
            s.x > canvas.width + s.length ||
            s.y > canvas.height + s.length;
          if (offScreen || s.life >= 1) return false;

          const fade =
            s.life < 0.15 ? s.life / 0.15 : 1 - (s.life - 0.15) / 0.85;
          const tailX = s.x - s.vx * (s.length / s.speed);
          const tailY = s.y - s.vy * (s.length / s.speed);

          const gradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
          gradient.addColorStop(0, "rgba(215, 226, 234, 0)");
          gradient.addColorStop(1, `rgba(215, 226, 234, ${0.85 * fade})`);

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(s.x, s.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.6;
          ctx.lineCap = "round";
          ctx.stroke();

          // bright head of the shooting star
          ctx.beginPath();
          ctx.arc(s.x, s.y, 1.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${fade})`;
          ctx.fill();

          return true;
        });
      }

      frame++;
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
