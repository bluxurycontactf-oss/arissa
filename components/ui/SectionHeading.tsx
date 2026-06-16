import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
}) {
  const alignClass = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";
  const eyebrowAlign = align === "center" ? "self-center" : "self-start";

  return (
    <Reveal className={`flex flex-col gap-4 max-w-3xl ${alignClass}`}>
      {eyebrow && (
        <span className={`inline-flex items-center gap-2 ${eyebrowAlign} rounded-full border border-border-soft bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-2/90`}>
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-foreground">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg text-muted leading-relaxed">{description}</p>
      )}
    </Reveal>
  );
}
