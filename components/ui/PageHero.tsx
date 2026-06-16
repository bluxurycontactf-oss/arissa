import { ReactNode } from "react";
import Container from "./Container";
import Reveal from "./Reveal";

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-24">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[36rem] w-[36rem] rounded-full bg-primary/20 blur-[120px] animate-float-slow" />

      <Container className="relative">
        <Reveal className="flex flex-col gap-5 max-w-3xl">
          {eyebrow && (
            <span className="inline-flex items-center gap-2 self-start rounded-full border border-border-soft bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-2">
              {eyebrow}
            </span>
          )}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-muted leading-relaxed max-w-2xl">{description}</p>
          )}
          {children}
        </Reveal>
      </Container>
    </section>
  );
}
