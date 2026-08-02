import type { Variants } from "framer-motion";

const itemTransition = {
  duration: 0.42,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const slideOneItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -55,
    y: 0,
  },

  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: itemTransition,
  },
};

export const slideTwoItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 0,
    y: 40,
  },

  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: itemTransition,
  },
};

export const slideThreeItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 55,
    y: 0,
  },

  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: itemTransition,
  },
};
