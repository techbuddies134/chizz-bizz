import Image from "next/image";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
    alt: "The candlelit dining room at Chizz Bizz",
    caption: "The Dining Room",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop",
    alt: "Signature double cheeseburger",
    caption: "Signature Burger",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop",
    alt: "Gourmet burger served with fries",
    caption: "The Classic",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
    alt: "Pepperoni Royale pizza",
    caption: "Pepperoni Pizza",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop",
    alt: "Artisan pizza with fresh greens",
    caption: "Artisan Pizza",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800&auto=format&fit=crop",
    alt: "Chocolate milkshake in a crystal glass",
    caption: "Chocolate Shake",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop",
    alt: "Crispy fried chicken platter",
    caption: "Crispy Chicken",
    tall: false,
  },
];

export function GallerySection() {
  return (
    <section id="gallery" className="relative py-20 sm:py-28 bg-[#0a0806]">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            index="III"
            eyebrow="The Gallery"
            title={
              <>
                Every plate, <span className="italic text-gold-gradient">a portrait.</span>
              </>
            }
            subtitle="Low light, warm brass and food that photographs as well as it eats. A glimpse of the room and the kitchen's current obsessions."
          />
        </Reveal>

        <div className="mt-12 grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] md:grid-cols-4 lg:auto-rows-[210px]">
          {gallery.map((item, index) => (
            <Reveal
              key={`${item.src}-${index}`}
              delay={(index % 4) * 70}
              className={`h-full ${item.tall ? "row-span-2" : ""}`}
            >
              <figure className="group relative h-full w-full overflow-hidden rounded-xl border border-white/5 bg-black shadow-sm">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover opacity-80 transition-all duration-[1200ms] ease-out group-hover:scale-[1.06] group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0806] via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-4">
                  <span className="translate-y-2 text-[9px] uppercase tracking-[0.24em] text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {item.caption}
                  </span>
                  <span className="h-1 w-1 shrink-0 rounded-full bg-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}