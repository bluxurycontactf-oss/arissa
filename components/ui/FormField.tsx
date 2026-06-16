import { ReactNode, InputHTMLAttributes } from "react";

export default function FormField({
  label,
  icon,
  ...props
}: {
  label: string;
  icon?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="font-medium text-foreground/90">{label}</span>
      <span className="relative flex items-center">
        {icon && <span className="absolute left-4 text-muted">{icon}</span>}
        <input
          {...props}
          className={`w-full rounded-2xl border border-border-soft bg-surface px-5 py-3 text-sm outline-none transition-colors focus:border-primary/60 ${
            icon ? "pl-11" : ""
          }`}
        />
      </span>
    </label>
  );
}
