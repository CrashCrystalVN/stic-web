"use client";

import React, { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  threshold?: number;
}

const defaultVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export function SectionWrapper({
  children,
  id,
  className,
  delay = 0,
  threshold = 0.15,
}: SectionWrapperProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold,
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: defaultVariants.hidden,
        visible: {
          ...defaultVariants.visible,
          transition: {
            duration: 0.7,
            delay,
            ease: [0.21, 0.47, 0.32, 0.98],
          },
        },
      }}
      className={cn("relative py-20 md:py-28 overflow-hidden", className)}
    >
      {children}
    </motion.section>
  );
}
