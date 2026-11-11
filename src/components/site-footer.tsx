import { site } from "@/lib/site";
import { IconArrowRight, IconInstagram, IconPhone, IconPin, IconSpark } from "./icons";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/15 bg-[#070605]">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[900px] -translate-x-1/2 rounded-full bg-gold/[0.06] blur-[150px]" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-8 border-b border-white/5 py-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="eyebrow">The table is set</p>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,4rem)] leading-[0.98] text-cream">
              Come hungry.
              <br />
              <span className="italic text-gold-gradient">Leave glowing.</span>
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <a href="#reserve" className="btn-gold group">
              Reserve a table
              <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#menu" className="btn-ghost">
              Order delivery
            </a>
          </div>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 font-display text-base text-gold">
                CB
              </span>
              <div>
                <p className="text-[0.85rem] font-extrabold uppercase tracking-[0.26em] text-cream">
                  Chizz Bizz
                </p>
                <p className="mt-1 text-[8px] uppercase tracking-[0.36em] text-gold/70">
                  Burger Atelier
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-[0.82rem] leading-relaxed text-mist/70">
              Comfort food with fine-dining discipline. Dry-aged beef, 48-hour
              dough and hand-cut fries, served in a room built for long evenings.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-mist transition-colors hover:border-gold/50 hover:text-gold"
                >
                  {social.label === "Instagram" ? (
                    <IconInstagram className="h-4 w-4" />
                  ) : (
                    <IconSpark className="h-3 w-3" />
                  )}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[9px] uppercase tracking-[0.28em] text-gold/80">Visit</p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(site.address)}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex items-start gap-2.5 text-[0.82rem] leading-relaxed text-mist/75 transition-colors hover:text-cream"
            >
              <IconPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/70" />
              {site.address}
            </a>
            <p className="mt-4 text-[0.78rem] leading-relaxed text-mist/50">
              Valet parking available after 7 PM.
              <br />
              Walk-ins welcome at the bar.
            </p>
          </div>

          <div>
            <p className="text-[9px] uppercase tracking-[0.28em] text-gold/80">Hours</p>
            <ul className="mt-4 space-y-3">
              {site.hours.map((entry) => (
                <li key={entry.day} className="text-[0.8rem]">
                  <span className="block text-cream/90">{entry.day}</span>
                  <span className="text-mist/55">{entry.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[9px] uppercase tracking-[0.28em] text-gold/80">
              Reservations
            </p>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="mt-4 flex items-center gap-2.5 text-[0.85rem] text-mist/75 transition-colors hover:text-cream"
            >
              <IconPhone className="h-3.5 w-3.5 text-gold/70" />
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 block text-[0.82rem] text-mist/55 transition-colors hover:text-gold"
            >
              {site.email}
            </a>
            <p className="mt-5 text-[0.78rem] leading-relaxed text-mist/50">
              Private dining, chef&rsquo;s counter
              <br />
              and gifting on request.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pb-24 pt-6 text-[9px] uppercase tracking-[0.2em] text-mist/40 sm:flex-row sm:pb-6">
          <p>© {new Date().getFullYear()} {site.name} Restaurant · All rights reserved</p>
          
          <p className="flex items-center gap-2">
            <IconSpark className="h-2.5 w-2.5 text-gold/60" />
            Crafted with fire &amp; gold
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <a 
              href="https://portfolio-self-nine-93.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-colors hover:text-gold"
            >
              Developed by <span className="text-gold font-semibold">Tech Buddies</span>
            </a>
            
            <a href="#home" className="transition-colors hover:text-gold">
              Back to top ↑
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}