import { marqueeWords } from "@/lib/site";
import { IconSpark } from "./icons";

export function Marquee() {
  const items = [...marqueeWords, ...marqueeWords];
  return (
    <div className="relative overflow-hidden border-b border-white/5 bg-[#0a0806] py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0a0806] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0a0806] to-transparent" />
      <div className="flex w-max animate-marquee items-center">
        {items.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="flex items-center gap-8 whitespace-nowrap px-8 text-[10px] uppercase tracking-[0.34em] text-mist/70"
          >
            {word}
            <IconSpark className="h-2.5 w-2.5 text-gold/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
