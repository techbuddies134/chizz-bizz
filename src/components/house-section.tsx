import Image from "next/image";
import { site } from "@/lib/site";
import { IconPin, IconSpark } from "./icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const pillars = [
  {
    title: "Sourced with obsession",
    copy: "Grass-fed, dry-aged beef from select farms. Produce delivered twice daily. Nothing frozen, ever.",
  },
  {
    title: "Built like couture",
    copy: "Every burger is weighed, seared and rested to order. Every plate leaves the pass only when it is right.",
  },
  {
    title: "Served with theatre",
    copy: "Low light, warm brass and a soundtrack of vinyl. Dining should be an occasion, not a transaction.",
  },
];

export function HouseSection() {
  return (
    <section id="house" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-gold/[0.05] blur-[140px]" />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            index="I"
            eyebrow="The House"
            title={
              <>
                A burger atelier,
                <br />
                <span className="italic text-gold-gradient">plated like couture.</span>
              </>
            }
            subtitle="Chizz Bizz began as a late-night experiment between a chef and a pastry cook. Today it is a 42-seat dining room in Gulberg where comfort food is treated with fine-dining discipline."
            aside={
              <a
                href="#gallery"
                className="hidden items-center gap-2 border-b border-gold/30 pb-1 text-[10px] uppercase tracking-[0.26em] text-gold transition-colors hover:border-gold lg:inline-flex"
              >
                Step inside the room
              </a>
            }
          />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[4/3.4] overflow-hidden rounded-[1.6rem] border border-gold/15">
                {/* Yahan internet wali image lagadi hai */}
                <Image
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop"
                  alt="The candlelit dining room at Chizz Bizz"
                  fill
                  sizes="(max-width: 1024px) 100vw, 620px"
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-gold/80">
                      The dining room
                    </p>
                    <p className="mt-1 font-display text-xl text-cream">
                      42 seats · Open till 2:30 AM
                    </p>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/30 bg-ink/60 text-gold backdrop-blur">
                    <IconPin />
                  </span>
                </div>
              </div>

              <div className="absolute -bottom-7 -right-3 hidden w-56 rounded-2xl border border-gold/25 bg-[#0d0b08]/95 p-5 shadow-panel backdrop-blur sm:block">
                <IconSpark className="h-4 w-4 text-gold" />
                <p className="mt-3 font-display text-lg leading-snug text-cream">
                  &ldquo;Comfort food, held to a fine-dining standard.&rdquo;
                </p>
                <p className="mt-3 text-[9px] uppercase tracking-[0.24em] text-mist/60">
                  Chef Hamza Riaz
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 90}>
                <div className="group flex gap-5 border-b border-white/5 py-6 first:pt-0">
                  <span className="font-display text-sm text-gold/70">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-[0.95rem] font-semibold tracking-wide text-cream transition-colors group-hover:text-gold">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-[0.86rem] leading-relaxed text-mist/80">
                      {pillar.copy}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={300}>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] text-mist/70">
                <span className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-gold" />
                  {site.address}
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-gold" />
                  Walk-ins welcome
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}