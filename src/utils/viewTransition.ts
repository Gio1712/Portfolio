import { flushSync } from "react-dom";

export function runViewTransition(callback: () => void) {
  const doc = document as Document & {
    startViewTransition?: (callback: () => void) => {
      finished: Promise<void>;
      ready: Promise<void>;
      updateCallbackDone: Promise<void>;
      skipTransition(): void;
    };
  };

  if (!doc.startViewTransition) {
    callback();
    return;
  }

  doc.startViewTransition(() => {
    flushSync(callback);
  });
}
