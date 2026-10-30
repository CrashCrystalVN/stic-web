"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const { contentVisible } = useLang();

  return (
    <motion.main
      className="flex-1"
      animate={{
        opacity: contentVisible ? 1 : 0,
        filter: contentVisible ? "blur(0px)" : "blur(3px)",
      }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.main>
  );
}
