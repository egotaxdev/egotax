"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  variant?: "default" | "accent" | "subtle";
  className?: string;
  background?: "light" | "dark" | "auto";
}

export default function SectionDivider({ 
  variant = "default", 
  className = "",
  background = "auto"
}: SectionDividerProps) {
  const getGradientClass = () => {
    switch (variant) {
      case "accent":
        return "bg-gradient-to-r from-transparent via-[#ffe502]/30 to-transparent";
      case "subtle":
        return "bg-gradient-to-r from-transparent via-gray-300/20 to-transparent dark:via-gray-600/20";
      default:
        return "bg-gradient-to-r from-transparent via-gray-400/30 to-transparent dark:via-gray-500/30";
    }
  };

  const getBackgroundClass = () => {
    if (background === "auto") {
      return "bg-transparent";
    }
    return background === "light" 
      ? "bg-white dark:bg-black" 
      : "bg-black dark:bg-white";
  };

  return (
    <div className={`w-full ${getBackgroundClass()}`}>
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.2 
        }}
        viewport={{ once: true, margin: "-50px" }}
        className={`w-full h-px ${getGradientClass()} ${className}`}
      />
    </div>
  );
}