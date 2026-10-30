"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none overflow-hidden rounded-2xl cursor-pointer";

    const variants = {
      primary:
        "bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/35 hover:brightness-105",
      secondary:
        "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-blue-100 dark:border-slate-700 hover:bg-blue-50/60 dark:hover:bg-slate-700/60 shadow-2xs",
      outline:
        "border border-blue-300/80 dark:border-slate-600 bg-white/70 dark:bg-slate-800/70 text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 shadow-2xs",
      ghost:
        "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/60 dark:hover:bg-slate-800/60",
      accent:
        "bg-gradient-to-r from-sky-400 to-indigo-500 text-white font-semibold shadow-md shadow-sky-400/25 hover:shadow-sky-400/35 hover:brightness-105",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs gap-1.5",
      md: "h-11 px-5 text-sm gap-2",
      lg: "h-12 px-7 text-base gap-2.5",
      icon: "h-10 w-10",
    };

    return (
      <motion.button
        ref={ref}
        disabled={disabled || isLoading}
        whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
        whileTap={{ scale: 0.94, transition: { duration: 0.1 } }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
