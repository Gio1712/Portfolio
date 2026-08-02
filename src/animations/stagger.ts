import type { Variants } from "framer-motion";

export const contentContainerVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      delayChildren: 0.02,
      staggerChildren: 0.07,
    },
  },
};
