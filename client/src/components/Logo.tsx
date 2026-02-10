import { motion } from "framer-motion";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

type LogoProps = {
  href?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeMap = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
};

export function Logo({
  href = "/",
  size = "md",
  className = "",
}: LogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-baseline gap-0 select-none",
        className
      )}
    >
      {/* ▮ Falling Block */}
      <motion.span
        aria-hidden="true"
        className={`${sizeMap[size]} inline-block align-baseline`}
        style={{
          width: "0.62em",
          height: "1em",
          background: "rgba(255,255,255,0.88)",
          marginRight: "0.3em",
        }}
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: [1, 1, 0], y: 0 }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: "easeOut",
          times: [0, 0.15, 1],
        }}
      />

      {/* DARYL Text */}
      <span
        className={`${sizeMap[size]} text-white/90 font-medium`}
        style={{ letterSpacing: "0.22em" }}
      >
        DARYL
      </span>

      {/* Animated Dots */}
      <span
        aria-hidden="true"
        className={`${sizeMap[size]} inline-flex items-baseline gap-0`}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="inline-block text-white/55"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
              times: [0, 0.05, 0.7, 0.75],
            }}
          >
            .
          </motion.span>
        ))}
      </span>
    </Link>
  );
}
