"use client";

import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/site";
import { useCart } from "./cart-provider";
import {
  IconBag,
  IconClose,
  IconPhone,
  IconSpark,
} from "./icons";

export function SiteHeader() {
  const { count, hydrated, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-40">
        <div className="border-b border-white/5 bg-ink/95 backdrop-blur">
          <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-between gap-4 px-5 text-[9px] uppercase tracking-[0.26em] text-mist/80 sm:px-8">
            <p className="flex items-center gap-2">
              <IconSpark className="h-2.5 w-2.5 text-gold" />
              <span className="hidden sm:inline">Complimentary delivery over Rs. 3,000</span>
              <span className="sm:hidden">Free delivery over Rs. 3,000</span>
            </p>
            <p className="hidden items-center gap-2 md:flex">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
              Kitchen open · 12:00 — 02:30
            </p>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 transition-colors hover:text-gold"
            >
              <IconPhone className="h-3 w-3" />
              {site.phone}
            </a>
          </div>
        </div>

        <div
          className={`border-b transition-all duration-500 ${
            scrolled
              ? "border-gold/20 bg-ink/90 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.95)] backdrop-blur-xl"
              : "border-transparent bg-gradient-to-b from-ink/85 to-ink/0"
          }`}
        >
          <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8">
            <a href="#home" className="group flex items-center gap-3">
              <span className="relative grid h-11 w-11 place-items-center rounded-full border border-gold/40 transition-colors duration-300 group-hover:border-gold">
                <span className="font-display text-lg leading-none text-gold">CB</span>
                <span className="absolute inset-[3px] rounded-full border border-gold/15" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-[0.95rem] font-extrabold uppercase tracking-[0.3em] text-cream">
                  Chizz Bizz
                </span>
                <span className="mt-1.5 text-[8px] uppercase tracking-[0.42em] text-gold/80">
                  Burger Atelier
                </span>
              </span>
            </a>

            <nav className="hidden items-center gap-8 lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative text-[10px] font-semibold uppercase tracking-[0.26em] text-mist transition-colors hover:text-cream"
                >
                  {link.label}
                  <span className="absolute -bottom-2 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="#reserve"
                className="hidden rounded-full border border-gold/25 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold transition-all hover:border-gold/70 hover:bg-gold/10 md:inline-flex"
              >
                Book a table
              </a>
              <button
                type="button"
                onClick={openCart}
                aria-label="Open cart"
                className="group relative inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-gold/[0.06] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-cream transition-all hover:border-gold/70 hover:bg-gold/15"
              >
                <IconBag className="h-4 w-4 text-gold" />
                <span className="hidden sm:inline">Cart</span>
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[10px] font-extrabold text-ink">
                  {hydrated ? count : 0}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-cream transition-colors hover:border-gold/50 hover:text-gold lg:hidden"
              >
                <span className="flex flex-col gap-[5px]">
                  <span className="block h-px w-4 bg-current" />
                  <span className="block h-px w-4 bg-current" />
                  <span className="block h-px w-2.5 bg-current" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[70] lg:hidden ${mobileOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!mobileOpen}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col border-l border-gold/20 bg-[#0b0907] px-7 pb-10 pt-7 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.34em] text-gold">
              Chizz Bizz
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-mist hover:text-cream"
            >
              <IconClose />
            </button>
          </div>

          <nav className="mt-12 flex flex-col gap-1">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="group flex items-baseline justify-between border-b border-white/5 py-4"
              >
                <span className="font-display text-3xl text-cream transition-colors group-hover:text-gold">
                  {link.label}
                </span>
                <span className="text-[10px] tracking-[0.2em] text-gold/40">
                  0{index + 1}
                </span>
              </a>
            ))}
          </nav>

          <div className="mt-auto space-y-4 pt-10">
            <a
              href="#reserve"
              onClick={() => setMobileOpen(false)}
              className="btn-gold w-full"
            >
              Reserve a table
            </a>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.2em] text-mist"
            >
              <IconPhone className="h-3.5 w-3.5 text-gold" />
              {site.phone}
            </a>
            <p className="text-center text-[10px] uppercase tracking-[0.24em] text-mist/50">
              {site.address}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
