import { useEffect, useRef, useState } from "react";

interface AboutModelStageProps {
  frame: number;
  mobile?: boolean;
}

const FRAME_COUNT = 120;

const framePath = (index: number) =>
  `/models/avatar/frame_${String(index).padStart(6, "0")}.webp`;

const clampFrame = (frame: number) =>
  Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(frame)));

const lerp = (from: number, to: number, progress: number) =>
  from + (to - from) * progress;

function getModelX(frame: number) {
  const safe = clampFrame(frame);

  if (safe <= 60) return lerp(-20, 0, safe / 60);

  return lerp(0, 20, (safe - 60) / 59);
}

export default function AboutModelStage({
  frame,
  mobile = false,
}: AboutModelStageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);

  const draw = (requestedFrame: number) => {
    const canvas = canvasRef.current;
    const image = imagesRef.current[clampFrame(requestedFrame)];

    if (!canvas || !image || !image.complete) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(canvas.clientWidth * dpr));
    const height = Math.max(1, Math.round(canvas.clientHeight * dpr));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    context.clearRect(0, 0, width, height);

    const imageRatio = image.naturalWidth / Math.max(1, image.naturalHeight);
    const canvasRatio = width / Math.max(1, height);

    let drawWidth = width;
    let drawHeight = height;

    if (imageRatio > canvasRatio) {
      drawHeight = width / imageRatio;
    } else {
      drawWidth = height * imageRatio;
    }

    const scale = mobile ? 1.08 : 1.15;
    drawWidth *= scale;
    drawHeight *= scale;

    context.drawImage(
      image,
      (width - drawWidth) / 2,
      height - drawHeight,
      drawWidth,
      drawHeight,
    );
  };

  useEffect(() => {
    let cancelled = false;
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    for (let index = 0; index < FRAME_COUNT; index += 1) {
      const image = new Image();
      image.decoding = "async";
      image.src = framePath(index);

      const done = () => {
        loaded += 1;

        if (!cancelled && loaded === FRAME_COUNT) {
          imagesRef.current = images;
          setReady(true);
        }
      };

      image.onload = done;
      image.onerror = done;
      images[index] = image;
    }

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    draw(frame);
  }, [frame, ready, mobile]);

  useEffect(() => {
    if (!ready) return;

    const onResize = () => draw(frame);
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [frame, ready, mobile]);

  const modelX = mobile ? 0 : getModelX(frame);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
    >
      <div
        className="absolute bottom-0 left-1/2 lg:bottom-[-1vh]"
        style={{
          transform: `translateX(calc(-50% + ${modelX}vw))`,
          willChange: "transform",
        }}
      >
        <div
          className="
            relative
            h-[54dvh]
            min-h-[340px]
            w-[100vw]
            max-w-[650px]
            sm:h-[58dvh]
            sm:max-w-[720px]
            lg:h-[88vh]
            lg:min-h-[620px]
            lg:w-[48vw]
            lg:max-w-[860px]
          "
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom,black 0%,black 74%,rgba(0,0,0,0.92) 82%,rgba(0,0,0,0.55) 91%,rgba(0,0,0,0.12) 97%,transparent 100%)",
            maskImage:
              "linear-gradient(to bottom,black 0%,black 74%,rgba(0,0,0,0.92) 82%,rgba(0,0,0,0.55) 91%,rgba(0,0,0,0.12) 97%,transparent 100%)",
          }}
        >
          <canvas ref={canvasRef} className="block h-full w-full" />

          {!ready && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#E8E9EB]/30">
                Loading model
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
