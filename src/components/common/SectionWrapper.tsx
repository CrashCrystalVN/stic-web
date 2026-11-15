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
    y: 28,
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function SectionWrapper({
  children,
  id,
  className,
  delay = 0,
  threshold = 0.12,
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
            duration: 0.85,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={cn("relative py-20 md:py-28 overflow-hidden section-cv-auto", className)}
    >
      {children}
    </motion.section>
  );
}
