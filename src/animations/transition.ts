export const PAGE_TRANSITION = {
  opacity: {
    duration: 0.55,
    ease: [0.22, 1, 0.36, 1] as const,
  },

  x: {
    duration: 0.58,
    ease: [0.22, 1, 0.36, 1] as const,
  },

  y: {
    duration: 0.58,
    ease: [0.22, 1, 0.36, 1] as const,
  },

  scale: {
    duration: 0.48,
    ease: [0.22, 1, 0.36, 1] as const,
  },

  filter: {
    duration: 0.42,
    ease: "easeInOut" as const,
  },
};

export const INDICATOR_TRANSITION = {
  width: {
    type: "spring" as const,
    stiffness: 420,
    damping: 30,
  },

  scale: {
    type: "spring" as const,
    stiffness: 420,
    damping: 24,
  },

  opacity: {
    duration: 0.2,
  },
};
