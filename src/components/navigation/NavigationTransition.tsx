import { AnimatePresence, motion } from "framer-motion";

interface NavigationTransitionProps {
  visible: boolean;
}

export default function NavigationTransition({
  visible,
}: NavigationTransitionProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{
            opacity: 0,
            backdropFilter: "blur(0px)",
          }}
          animate={{
            opacity: 1,
            backdropFilter: "blur(7px)",
          }}
          exit={{
            opacity: 0,
            backdropFilter: "blur(0px)",
          }}
          transition={{
            duration: 0.28,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            fixed
            inset-0
            z-[999]
            pointer-events-none
            bg-black/15
          "
        >
          {/* Scan line nhẹ */}
          <motion.div
            initial={{
              y: "-20vh",
              opacity: 0,
            }}
            animate={{
              y: "120vh",
              opacity: [0, 0.35, 0],
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute
              inset-x-0
              top-0
              h-20
              bg-gradient-to-b
              from-transparent
              via-[#E8E9EB]/5
              to-transparent
            "
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
