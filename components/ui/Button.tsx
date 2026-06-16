import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 whitespace-nowrap";

const sizes = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-primary to-primary-2 text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02]",
  outline:
    "border border-border-soft text-foreground hover:border-primary/60 hover:bg-surface",
  ghost: "text-muted hover:text-foreground",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  icon,
}: {
  children: ReactNode;
  href: string;
  variant?: Variant;
  size?: "md" | "lg";
  className?: string;
  icon?: ReactNode;
}) {
  return (
    <Link href={href} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
      {icon}
    </Link>
  );
}
