import { useCallback, useEffect, useRef, useState } from "react";

import { NavigateOptions, To, useNavigate } from "react-router-dom";

const TRANSITION_DELAY = 420;

export default function useHudNavigate() {
  const navigate = useNavigate();

  const [isRouteLoading, setIsRouteLoading] = useState(false);

  const timeoutRef = useRef<number | null>(null);

  const hudNavigate = useCallback(
    (to: To, options?: NavigateOptions) => {
      if (isRouteLoading) return;

      setIsRouteLoading(true);

      timeoutRef.current = window.setTimeout(() => {
        navigate(to, options);
      }, TRANSITION_DELAY);
    },
    [isRouteLoading, navigate],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    hudNavigate,
    isRouteLoading,
  };
}
