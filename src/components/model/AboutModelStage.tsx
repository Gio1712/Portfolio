import { useEffect, useRef, useState } from "react";

interface AboutModelStageProps {
  activeSlide: number;
  onFrameChange?: (frame: number) => void;
  onAnimationStateChange?: (isAnimating: boolean) => void;
}

const FRAME_COUNT = 120;
export const TARGET_FRAMES: readonly number[] = [0, 68, 119];

const FRAME_DELAY_START_MS = 16;
const FRAME_DELAY_FAST_MS = 8;
const FRAME_DELAY_END_MS = 13;
const END_SLOWDOWN_PORTION = 0.14;

const MODEL_LEFT_VW = -20;
const MODEL_CENTER_VW = 0;
const MODEL_RIGHT_VW = 20;

const framePath = (index: number) =>
  `/models/avatar/frame_${String(index).padStart(6, "0")}.webp`;

function clampFrame(frame: number) {
  return Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(frame)));
}

function lerp(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

function easeInCubic(progress: number) {
  return progress * progress * progress;
}

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

function getFrameDelay(completedSteps: number, totalSteps: number) {
  if (totalSteps <= 1) return FRAME_DELAY_FAST_MS;

  const progress = completedSteps / totalSteps;

  if (progress < 1 - END_SLOWDOWN_PORTION) {
    const accelerationProgress =
      progress / (1 - END_SLOWDOWN_PORTION);

    return lerp(
      FRAME_DELAY_START_MS,
      FRAME_DELAY_FAST_MS,
      easeInCubic(accelerationProgress),
    );
  }

  const slowdownProgress =
    (progress - (1 - END_SLOWDOWN_PORTION)) /
    END_SLOWDOWN_PORTION;

  return lerp(
    FRAME_DELAY_FAST_MS,
    FRAME_DELAY_END_MS,
    easeOutCubic(slowdownProgress),
  );
}

function getModelXFromFrame(frame: number) {
  const safeFrame = clampFrame(frame);

  if (safeFrame <= 60) {
    return lerp(
      MODEL_LEFT_VW,
      MODEL_CENTER_VW,
      safeFrame / 60,
    );
  }

  return lerp(
    MODEL_CENTER_VW,
    MODEL_RIGHT_VW,
    (safeFrame - 60) / 59,
  );
}

export default function AboutModelStage({
  activeSlide,
  onFrameChange,
  onAnimationStateChange,
}: AboutModelStageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(TARGET_FRAMES[0] ?? 0);
  const timerRef = useRef<number | null>(null);

  const onFrameChangeRef = useRef(onFrameChange);
  const onAnimationStateChangeRef = useRef(
    onAnimationStateChange,
  );

  const [currentFrame, setCurrentFrame] = useState(
    TARGET_FRAMES[0] ?? 0,
  );
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    onFrameChangeRef.current = onFrameChange;
  }, [onFrameChange]);

  useEffect(() => {
    onAnimationStateChangeRef.current =
      onAnimationStateChange;
  }, [onAnimationStateChange]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");

    const update = () => setIsMobile(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  const drawFrame = (frame: number) => {
    const canvas = canvasRef.current;
    const image = imagesRef.current[frame];

    if (!canvas || !image || !image.complete) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    const nextWidth = Math.max(1, Math.round(displayWidth * pixelRatio));
    const nextHeight = Math.max(1, Math.round(displayHeight * pixelRatio));

    if (
      canvas.width !== nextWidth ||
      canvas.height !== nextHeight
    ) {
      canvas.width = nextWidth;
      canvas.height = nextHeight;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    const imageRatio =
      image.naturalWidth / Math.max(1, image.naturalHeight);
    const canvasRatio =
      canvas.width / Math.max(1, canvas.height);

    let drawWidth = canvas.width;
    let drawHeight = canvas.height;

    if (imageRatio > canvasRatio) {
      drawHeight = canvas.width / imageRatio;
    } else {
      drawWidth = canvas.height * imageRatio;
    }

    const scale = isMobile ? 1.12 : 1.15;
    drawWidth *= scale;
    drawHeight *= scale;

    const x = (canvas.width - drawWidth) / 2;
    const y = canvas.height - drawHeight;

    context.drawImage(
      image,
      x,
      y,
      drawWidth,
      drawHeight,
    );
  };

  useEffect(() => {
    let cancelled = false;
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const markLoaded = () => {
      loadedCount += 1;

      if (
        !cancelled &&
        loadedCount === FRAME_COUNT
      ) {
        imagesRef.current = loadedImages;
        setIsReady(true);
        drawFrame(currentFrameRef.current);
      }
    };

    for (let index = 0; index < FRAME_COUNT; index += 1) {
      const image = new Image();
      image.decoding = "async";
      image.src = framePath(index);
      image.onload = markLoaded;
      image.onerror = markLoaded;
      loadedImages[index] = image;
    }

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;

    drawFrame(currentFrameRef.current);

    const onResize = () => {
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [isReady, isMobile]);

  useEffect(() => {
    if (!isReady) return;

    const targetFrame = clampFrame(
      TARGET_FRAMES[activeSlide] ?? 0,
    );

    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (currentFrameRef.current === targetFrame) {
      drawFrame(targetFrame);
      onFrameChangeRef.current?.(targetFrame);
      onAnimationStateChangeRef.current?.(false);
      return;
    }

    onAnimationStateChangeRef.current?.(true);

    const totalSteps = Math.abs(
      targetFrame - currentFrameRef.current,
    );

    let completedSteps = 0;

    const playNextFrame = () => {
      const current = currentFrameRef.current;

      if (current === targetFrame) {
        timerRef.current = null;
        onAnimationStateChangeRef.current?.(false);
        return;
      }

      const direction = targetFrame > current ? 1 : -1;
      const nextFrame = clampFrame(current + direction);

      currentFrameRef.current = nextFrame;
      setCurrentFrame(nextFrame);
      drawFrame(nextFrame);
      onFrameChangeRef.current?.(nextFrame);

      if (nextFrame === targetFrame) {
        timerRef.current = null;
        onAnimationStateChangeRef.current?.(false);
        return;
      }

      completedSteps += 1;

      timerRef.current = window.setTimeout(
        playNextFrame,
        getFrameDelay(completedSteps, totalSteps),
      );
    };

    timerRef.current = window.setTimeout(
      playNextFrame,
      FRAME_DELAY_START_MS,
    );

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [activeSlide, isReady]);

  const modelX = isMobile
    ? 0
    : getModelXFromFrame(currentFrame);

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
        z-10
        overflow-hidden
      "
    >
      <div
        className="
          absolute
          bottom-[0.75rem]
          left-1/2
          lg:bottom-[-1vh]
        "
        style={{
          transform: `translateX(calc(-50% + ${modelX}vw))`,
          willChange: "transform",
        }}
      >
        <div
          className="
            relative
            h-[62dvh]
            min-h-[400px]
            w-[108vw]
            max-w-[700px]
            sm:h-[66dvh]
            sm:max-w-[760px]
            lg:h-[88vh]
            lg:min-h-[620px]
            lg:w-[48vw]
            lg:max-w-[860px]
          "
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 74%, rgba(0,0,0,0.92) 82%, rgba(0,0,0,0.55) 91%, rgba(0,0,0,0.12) 97%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 74%, rgba(0,0,0,0.92) 82%, rgba(0,0,0,0.55) 91%, rgba(0,0,0,0.12) 97%, transparent 100%)",
          }}
        >
          <canvas
            ref={canvasRef}
            className="
              block
              h-full
              w-full
            "
          />

          {!isReady && (
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
