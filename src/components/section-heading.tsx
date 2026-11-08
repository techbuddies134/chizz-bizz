import type { ReactNode } from "react";

export function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
  align = "left",
  aside,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  aside?: ReactNode;
}) {
  return (
    <div
      className={`flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between ${
        align === "center" ? "text-center lg:flex-col lg:items-center" : ""
      }`}
    >
      <div className={align === "center" ? "max-w-2xl" : "max-w-2xl"}>
        <p className="eyebrow">
          {index ? <span className="text-gold/60">{index}</span> : null}
          <span className="h-px w-8 bg-gold/40" />
          {eyebrow}
        </p>
        <h2 className="mt-5 font-display text-[clamp(2.3rem,4.4vw,3.9rem)] leading-[1.02] tracking-[-0.01em] text-cream">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-5 max-w-xl text-[0.94rem] leading-relaxed text-mist">
            {subtitle}
          </p>
        ) : null}
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  );
}

export function Stars({
  rating,
  className = "",
  size = "h-3.5 w-3.5",
}: {
  rating: number;
  className?: string;
  size?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-1 text-gold ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${size} ${star <= Math.round(rating) ? "opacity-100" : "opacity-25"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.07 3.29a1 1 0 0 0 .95.69h3.46c.97 0 1.37 1.24.59 1.81l-2.8 2.03a1 1 0 0 0-.36 1.12l1.07 3.29c.3.92-.76 1.69-1.54 1.12l-2.8-2.03a1 1 0 0 0-1.18 0l-2.8 2.03c-.78.57-1.83-.2-1.54-1.12l1.07-3.29a1 1 0 0 0-.36-1.12L2.98 8.72c-.78-.57-.38-1.81.59-1.81H7.03a1 1 0 0 0 .95-.69L9.05 2.93Z" />
        </svg>
      ))}
    </span>
  );
}
