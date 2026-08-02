import { AnimatePresence, motion } from "framer-motion";

interface RouteLoadingOverlayProps {
  visible: boolean;
  label?: string;
}

export default function RouteLoadingOverlay({
  visible,
  label = "Loading project",
}: RouteLoadingOverlayProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.18,
          }}
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            overflow-hidden
            bg-[#080808]
          "
        >
          {/* Background grid */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.025]
            "
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(232,233,235,0.4) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(232,233,235,0.4) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "72px 72px",
            }}
          />

          {/* Glow */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.7,
            }}
            animate={{
              opacity: [0, 0.5, 0.15],
              scale: [0.7, 1.15, 1],
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              pointer-events-none
              absolute
              size-[440px]
              rounded-full
              bg-[#315efb]/10
              blur-[110px]
            "
          />

          {/* Main loader */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 1.05,
              filter: "blur(6px)",
            }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              flex
              flex-col
              items-center
              justify-center
            "
          >
            {/* HUD node */}
            <div
              className="
                relative
                flex
                size-20
                items-center
                justify-center
              "
            >
              <motion.span
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 1.1,
                  ease: "linear",
                  repeat: Infinity,
                }}
                className="
                  absolute
                  size-16
                  rounded-full
                  border
                  border-transparent
                  border-l-[#E8E9EB]/55
                  border-t-[#E8E9EB]/20
                "
              />

              <motion.span
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 1.7,
                  ease: "linear",
                  repeat: Infinity,
                }}
                className="
                  absolute
                  size-11
                  rounded-full
                  border
                  border-transparent
                  border-b-[#E8E9EB]/35
                  border-r-[#E8E9EB]/15
                "
              />

              <motion.span
                animate={{
                  scale: [0.8, 1.25, 0.8],
                  opacity: [0.45, 1, 0.45],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  size-2
                  rounded-full
                  bg-[#E8E9EB]
                  shadow-[0_0_18px_rgba(232,233,235,0.75)]
                "
              />

              {/* Four corners */}
              <span className="absolute left-0 top-0 size-3 border-l border-t border-[#E8E9EB]/35" />
              <span className="absolute right-0 top-0 size-3 border-r border-t border-[#E8E9EB]/35" />
              <span className="absolute bottom-0 left-0 size-3 border-b border-l border-[#E8E9EB]/35" />
              <span className="absolute bottom-0 right-0 size-3 border-b border-r border-[#E8E9EB]/35" />
            </div>

            <p
              className="
                mt-6
                text-[9px]
                font-bold
                uppercase
                tracking-[0.32em]
                text-[#E8E9EB]/45
              "
            >
              {label}
            </p>

            {/* Loading bar */}
            <div
              className="
                relative
                mt-4
                h-px
                w-44
                overflow-hidden
                bg-[#E8E9EB]/10
              "
            >
              <motion.span
                initial={{
                  x: "-100%",
                }}
                animate={{
                  x: "240%",
                }}
                transition={{
                  duration: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                  repeat: Infinity,
                }}
                className="
                  absolute
                  inset-y-0
                  left-0
                  w-1/2
                  bg-gradient-to-r
                  from-transparent
                  via-[#E8E9EB]/80
                  to-transparent
                "
              />
            </div>

            <p
              className="
                mt-3
                text-[7px]
                font-bold
                uppercase
                tracking-[0.28em]
                text-[#E8E9EB]/20
              "
            >
              Initializing visual module
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
