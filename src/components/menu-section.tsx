"use client";

import Image from "next/image";
import { formatPKR } from "@/lib/format";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { IconPlus } from "./icons";
import { useCart } from "./cart-provider";

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  tag?: string | null;
};

export function MenuSection({ items }: { items: MenuItem[] }) {
  const { addItem } = useCart();

  return (
    <section id="menu" className="relative py-20 sm:py-28 bg-[#0a0806]">
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            index="II"
            eyebrow="The Menu"
            title={
              <>
                Curated for <span className="italic text-gold-gradient">the bold.</span>
              </>
            }
            subtitle="Each dish is a study in texture and temperature. Add your favourites to the cart and taste the runway."
            aside={
              <span className="hidden items-center gap-2 border-b border-white/10 pb-1 text-[10px] uppercase tracking-[0.26em] text-mist lg:inline-flex">
                {items.length} dishes available
              </span>
            }
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={(index % 4) * 90}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#0d0b08] shadow-panel transition-all duration-500 hover:border-gold/30">
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b08] via-black/20 to-transparent" />
                  
                  {item.tag && (
                    <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-ink shadow-md">
                      {item.tag}
                    </span>
                  )}
                  
                  <span className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1.5 text-xs font-bold text-gold backdrop-blur border border-gold/20">
                    {formatPKR(item.price)}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="font-display text-xl text-cream transition-colors group-hover:text-gold">
                      {item.name}
                    </h3>
                  </div>
                  <p className="mb-4 text-xs leading-relaxed text-mist/70 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-mist/50">
                      {item.category}
                    </span>
                    <button
                      onClick={() => addItem(item.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-ink transition-all hover:bg-white hover:scale-110 active:scale-95"
                      aria-label={`Add ${item.name} to cart`}
                    >
                      <IconPlus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}