"use client";

import { useEffect, useState } from "react";
import { formatPKR } from "@/lib/format";
import {
  IconArrowLeft,
  IconArrowRight,
  IconPause,
  IconPlay,
  IconSpark,
} from "./icons";
import { Stars } from "./section-heading";

const showcaseDishes = [
  {
    id: "le-classique",
    name: "Le Classique",
    label: "House Signature",
    price: 1250,
    note: "Aged cheddar · caramelised onion · house gold sauce",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "truffle-fries",
    name: "Truffle Parmesan",
    label: "Cult Favourite",
    price: 650,
    note: "Hand-cut fries · black truffle oil · parmesan snow",
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "pepperoni-pizza",
    name: "Pepperoni Pizza",
    label: "Best Seller",
    price: 2200,
    note: "Spicy pepperoni · mozzarella · fresh basil",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "fried-chicken",
    name: "Crispy Fried Chicken",
    label: "Chef's Special",
    price: 950,
    note: "Golden fried chicken · spicy dip",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "smash-burger",
    name: "Smash Burger",
    label: "Popular",
    price: 1150,
    note: "Double beef patty · melted cheese",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "spicy-zinger",
    name: "Spicy Zinger",
    label: "Hot Pick",
    price: 950,
    note: "Crispy chicken fillet · spicy mayo",
    image: "https://images.unsplash.com/photo-1615297928064-24977384d0da?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "loaded-fries",
    name: "Loaded Fries",
    label: "Must Try",
    price: 650,
    note: "Crispy fries · cheese · jalapeños",
    image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "chocolate-shake",
    name: "Chocolate Shake",
    label: "New Arrival",
    price: 550,
    note: "Thick creamy chocolate milkshake",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "bbq-wings",
    name: "BBQ Wings",
    label: "Fan Favourite",
    price: 750,
    note: "Sticky BBQ glaze · sesame seeds",
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "cheese-burger",
    name: "Classic Cheeseburger",
    label: "Timeless",
    price: 1050,
    note: "Beef patty · American cheese · pickles",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=800&auto=format&fit=crop",
  },
];

const COUNT = showcaseDishes.length;
// Even number of pictures ke liye balance fix
const HALF = Math.floor((COUNT - 1) / 2);

function wrappedOffset(index: number, active: number) {
  let offset = index - active;
  if (offset > HALF) offset -= COUNT;
  if (offset < -HALF) offset += COUNT;
  return offset;
}

function stageStyle(offset: number) {
  if (offset === 0) {
    return {
      transform: "translateX(-50%) translateZ(0px) rotateY(0deg) scale(1)",
      opacity: 1,
      filter: "blur(0px)",
      zIndex: 30,
    };
  }
  const abs = Math.abs(offset);
  const dir = offset > 0 ? 1 : -1;
  return {
    transform: `translateX(calc(-50% + ${dir * (abs === 1 ? 54 : 94)}%)) translateZ(${
      abs === 1 ? -110 : -260
    }px) rotateY(${dir * -18}deg) scale(${abs === 1 ? 0.68 : 0.46})`,
    opacity: abs === 1 ? 0.32 : 0.1,
    filter: `blur(${abs === 1 ? 2.5 : 7}px)`,
    zIndex: 30 - abs * 10,
  };
}

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const active = showcaseDishes[activeIndex];

  useEffect(() => {
    if (!isPlaying || hovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % COUNT);
    }, 2000); // Speed 2 seconds
    return () => clearInterval(timer);
  }, [isPlaying, hovered]);

  const go = (direction: number) =>
    setActiveIndex((prev) => (prev + direction + COUNT) % COUNT);

  return (
    // Yahan dark background laga diya hai
    <section id="home" className="relative overflow-hidden bg-[#0a0806]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-gold/[0.07] blur-[130px]" />
        <div className="absolute right-[-10%] top-[18%] h-[620px] w-[620px] rounded-full bg-[#5a3d16]/25 blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(200,169,107,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(200,169,107,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,#000_20%,transparent_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-5 pb-14 pt-10 sm:px-8 lg:grid-cols-[1.02fr_1fr] lg:gap-6 lg:pb-20 lg:pt-16">
        <div className="animate-fade-up">
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-9 bg-gold/50" />
            Lahore · Est. 2024
          </p>

          <h1 className="mt-6 font-display text-[clamp(3.4rem,7.6vw,6.1rem)] leading-[0.9] tracking-[-0.025em] text-cream">
            Taste the
            <span className="mt-1 block italic text-gold-gradient">Runway.</span>
          </h1>

          <p className="mt-7 max-w-md text-[0.95rem] leading-[1.85] text-mist">
            A burger atelier in the heart of Gulberg, where dry-aged beef,
            48-hour dough and hand-cut truffle fries are plated with the
            precision of a runway show.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <a href="#menu" className="btn-gold group">
              Explore the menu
              <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#reserve" className="btn-ghost">
              Reserve a table
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4 text-[11px] text-mist">
            <div className="flex items-center gap-2.5">
              <Stars rating={5} />
              <span>
                <span className="font-semibold text-cream">4.9</span> · 1,200+ guests
              </span>
            </div>
            <span className="hidden h-3 w-px bg-white/10 sm:block" />
            <div className="flex items-center gap-2">
              <IconSpark className="h-3 w-3 text-gold" />
              100% halal · Flame grilled
            </div>
          </div>
        </div>

        {/* 3D Showcase */}
        <div
          className="relative"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/15 sm:h-[420px] sm:w-[420px]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-dashed border-gold/20 sm:h-[470px] sm:w-[470px]" />
          <div className="pointer-events-none absolute left-1/2 top-[62%] h-10 w-[62%] -translate-x-1/2 rounded-[50%] bg-gold/15 blur-2xl" />

          <div
            className="relative mx-auto h-[330px] w-full max-w-[560px] sm:h-[400px] lg:h-[450px]"
            style={{ perspective: "1500px" }}
          >
            {showcaseDishes.map((dish, index) => {
              const offset = wrappedOffset(index, activeIndex);
              const isActive = offset === 0;
              return (
                <div
                  key={dish.id}
                  className="absolute inset-0 flex items-center justify-center transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ ...stageStyle(offset), transformStyle: "preserve-3d" }}
                  aria-hidden={!isActive}
                >
                  <div className="relative w-[85%] h-[85%] rounded-full overflow-hidden flex items-center justify-center shadow-[0_20px_50px_rgba(200,169,107,0.2)] border-4 border-[#cba052]/30">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover select-none"
                      draggable={false}
                    />
                  </div>
                </div>
              );
            })}

            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous signature dish"
              className="absolute left-0 top-1/2 z-40 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-gold/25 bg-ink/60 text-mist backdrop-blur transition-all hover:border-gold hover:text-gold sm:h-11 sm:w-11"
            >
              <IconArrowLeft />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next signature dish"
              className="absolute right-0 top-1/2 z-40 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-gold/25 bg-ink/60 text-mist backdrop-blur transition-all hover:border-gold hover:text-gold sm:h-11 sm:w-11"
            >
              <IconArrowRight />
            </button>
          </div>

          <div className="relative z-40 mt-2 sm:mt-4">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[9px] uppercase tracking-[0.3em] text-gold/80">
                  {active.label} · 0{activeIndex + 1}
                </p>
                <h3 className="mt-1.5 font-display text-2xl leading-tight text-cream sm:text-[1.75rem]">
                  {active.name}
                  <span className="ml-2 text-base text-gold">
                    {formatPKR(active.price)}
                  </span>
                </h3>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying((prev) => !prev)}
                  aria-label={isPlaying ? "Pause showcase" : "Play showcase"}
                  className="grid h-9 w-9 place-items-center rounded-full bg-gold text-ink transition-transform hover:scale-105"
                >
                  {isPlaying ? (
                    <IconPause className="h-3 w-3" />
                  ) : (
                    <IconPlay className="h-3 w-3" />
                  )}
                </button>
                <div className="flex items-center gap-1.5 pl-1">
                  {showcaseDishes.map((dish, index) => (
                    <button
                      key={dish.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Show ${dish.name}`}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        index === activeIndex
                          ? "w-6 bg-gold"
                          : "w-1.5 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-2 max-w-md truncate text-[11px] tracking-wide text-mist/70">
              {active.note}
            </p>
          </div>
        </div>
      </div>

      <div className="relative border-y border-white/5 bg-[#0a0806]/60">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-white/5 px-5 sm:px-8 lg:grid-cols-4">
          {[
            { value: "12", label: "Signature plates" },
            { value: "4.9", label: "Average rating" },
            { value: "28′", label: "Average delivery" },
            { value: "100%", label: "Halal kitchen" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-baseline gap-3 px-4 py-6 first:pl-0 sm:px-7 lg:py-7"
            >
              <span className="font-display text-3xl text-gold sm:text-4xl">
                {stat.value}
              </span>
              <span className="text-[9px] uppercase tracking-[0.22em] text-mist/70">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}