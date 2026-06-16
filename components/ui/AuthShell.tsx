import Link from "next/link";
import { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import Reveal from "./Reveal";

export default function AuthShell({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-28">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_60%,transparent_100%)]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[32rem] w-[32rem] rounded-full bg-primary/20 blur-[120px] animate-float-slow" />

      <Reveal className="relative w-full max-w-md">
        <div className="gradient-border glow rounded-3xl p-8 sm:p-10 flex flex-col gap-7">
          <Link href="/" className="flex items-center gap-2 self-center font-display text-xl font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-2">
              <Sparkles size={18} className="text-white" />
            </span>
            Arissa
          </Link>

          <div className="text-center flex flex-col gap-2">
            <h1 className="font-display text-2xl sm:text-3xl font-semibold">{title}</h1>
            <p className="text-sm text-muted leading-relaxed">{description}</p>
          </div>

          {children}

          <p className="text-center text-sm text-muted">{footer}</p>
        </div>
      </Reveal>
    </section>
  );
}
