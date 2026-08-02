import { useEffect, useRef, useState } from "react";

interface AboutModelStageProps {
  activeSlide: number;
  onFrameChange?: (frame: number) => void;
  onAnimationStateChange?: (isAnimating: boolean) => void;
}

const FRAME_COUNT = 120;

/*
 * Slide 1  -> frame 0   -> model bên trái
 * Slide 2  -> frame 60  -> model ở giữa
 * Slide 3  -> frame 119 -> model bên phải
 */
export const TARGET_FRAMES: readonly number[] = [0, 68, 119];

/*
 * Mỗi frame vẫn chạy tuần tự, nhưng delay giảm dần:
 * bắt đầu chậm -> tăng tốc ở giữa -> hãm nhẹ gần frame đích.
 */
const FRAME_DELAY_START_MS = 15;
const FRAME_DELAY_FAST_MS = 8;
const FRAME_DELAY_END_MS = 12;
const END_SLOWDOWN_PORTION = 0.12;

const MODEL_LEFT_VW = -20;
const MODEL_CENTER_VW = 0;
const MODEL_RIGHT_VW = 20;

const framePath = (index: number) =>
  `/models/avatar/frame_${String(index).padStart(6, "0")}.webp`;

const AVATAR_SCALE = 1.15;

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

/*
 * Tính delay cho TỪNG frame, không skip frame:
 * - đầu chuyển động chậm
 * - sau đó tăng tốc rõ
 * - khoảng 12% cuối hãm nhẹ để dừng không gắt
 */
function getFrameDelay(completedSteps: number, totalSteps: number) {
  if (totalSteps <= 1) {
    return FRAME_DELAY_FAST_MS;
  }

  const progress = completedSteps / totalSteps;

  if (progress < 1 - END_SLOWDOWN_PORTION) {
    const accelerationProgress = progress / (1 - END_SLOWDOWN_PORTION);

    return lerp(
      FRAME_DELAY_START_MS,
      FRAME_DELAY_FAST_MS,
      easeInCubic(accelerationProgress),
    );
  }

  const slowdownProgress =
    (progress - (1 - END_SLOWDOWN_PORTION)) / END_SLOWDOWN_PORTION;

  return lerp(
    FRAME_DELAY_FAST_MS,
    FRAME_DELAY_END_MS,
    easeOutCubic(slowdownProgress),
  );
}

/*
 * Vị trí ngang phụ thuộc trực tiếp vào frame hiện tại.
 *
 * Frame 0   = trái
 * Frame 60  = giữa
 * Frame 119 = phải
 *
 * Khi chạy ngược, vị trí cũng tự chạy ngược theo từng frame.
 * Không có animation vị trí riêng nên model luôn vừa xoay vừa di chuyển.
 */
function getModelXFromFrame(frame: number) {
  const safeFrame = clampFrame(frame);

  if (safeFrame <= 60) {
    const progress = safeFrame / 60;

    return lerp(MODEL_LEFT_VW, MODEL_CENTER_VW, progress);
  }

  const progress = (safeFrame - 60) / (119 - 60);

  return lerp(MODEL_CENTER_VW, MODEL_RIGHT_VW, progress);
}

export default function AboutModelStage({
  activeSlide,
  onFrameChange,
  onAnimationStateChange,
}: AboutModelStageProps) {
  const initialFrame = TARGET_FRAMES[0] ?? 0;

  const [currentFrame, setCurrentFrame] = useState<number>(initialFrame);

  const currentFrameRef = useRef<number>(initialFrame);

  const timerRef = useRef<number | null>(null);

  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) {
      return;
    }

    loadedRef.current = true;

    for (let index = 0; index < FRAME_COUNT; index += 1) {
      const image = new Image();
      image.src = framePath(index);
    }
  }, []);

  useEffect(() => {
    const targetFrame = clampFrame(TARGET_FRAMES[activeSlide] ?? initialFrame);

    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (currentFrameRef.current === targetFrame) {
      onFrameChange?.(targetFrame);
      onAnimationStateChange?.(false);
      return;
    }

    onAnimationStateChange?.(true);

    const totalSteps = Math.abs(targetFrame - currentFrameRef.current);

    let completedSteps = 0;

    /*
     * Chạy tuần tự đúng từng frame:
     * 0, 1, 2 ... 60 ... 119
     *
     * Khi quay ngược:
     * 119, 118, 117 ... 60 ... 1, 0
     */
    const playNextFrame = () => {
      const current = currentFrameRef.current;

      if (current === targetFrame) {
        timerRef.current = null;
        onAnimationStateChange?.(false);
        return;
      }

      const direction = targetFrame > current ? 1 : -1;
      const nextFrame = clampFrame(current + direction);

      currentFrameRef.current = nextFrame;
      setCurrentFrame(nextFrame);
      onFrameChange?.(nextFrame);

      if (nextFrame === targetFrame) {
        timerRef.current = null;
        onAnimationStateChange?.(false);
        return;
      }

      completedSteps += 1;

      const nextDelay = getFrameDelay(completedSteps, totalSteps);

      timerRef.current = window.setTimeout(playNextFrame, nextDelay);
    };

    timerRef.current = window.setTimeout(playNextFrame, FRAME_DELAY_START_MS);

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [activeSlide, initialFrame, onAnimationStateChange, onFrameChange]);

  const modelX = getModelXFromFrame(currentFrame);

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
      {/*
        Không dùng transition CSS hay Framer Motion cho vị trí.
        Mỗi frame tự quyết định vị trí ngang tương ứng.
      */}
      <div
        className="
          absolute
          bottom-[-1vh]
          left-1/2
        "
        style={{
          transform: `translateX(calc(-50% + ${modelX}vw))`,
          willChange: "transform",
        }}
      >
        <div
          className="
            relative
            h-[68vh]
            min-h-[460px]
            w-[92vw]
            max-w-[560px]
            sm:h-[74vh]
            sm:max-w-[620px]
            lg:h-[88vh]
            lg:min-h-[620px]
            lg:w-[48vw]
            lg:max-w-[860px]
          "
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 72%, rgba(0,0,0,0.92) 80%, rgba(0,0,0,0.58) 89%, rgba(0,0,0,0.18) 96%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 72%, rgba(0,0,0,0.92) 80%, rgba(0,0,0,0.58) 89%, rgba(0,0,0,0.18) 96%, transparent 100%)",
          }}
        >
          <img
            src={framePath(currentFrame)}
            alt=""
            draggable={false}
            className="
              absolute
              inset-0
              h-full
              w-full
              select-none
              object-contain
            "
            style={{
              transform: `scale(${AVATAR_SCALE})`,
              transformOrigin: "bottom center",
            }}
          />
        </div>
      </div>
    </div>
  );
}
