import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "success"
    | "warning"
    | "info"
    | "neon";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-colors";

  const variants = {
    default:
      "bg-sky-500/10 text-sky-400 border border-sky-400/30",
    secondary:
      "bg-slate-800 text-slate-300 border border-slate-700",
    outline:
      "border border-slate-600 text-slate-300",
    success:
      "bg-emerald-500/10 text-emerald-400 border border-emerald-400/30",
    warning:
      "bg-amber-500/10 text-amber-400 border border-amber-400/30",
    info:
      "bg-blue-500/10 text-blue-400 border border-blue-400/30",
    neon:
      "bg-slate-900 text-sky-300 border border-sky-400/60 shadow-[0_0_12px_rgba(56,189,248,0.35)]",
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </div>
  );
}
