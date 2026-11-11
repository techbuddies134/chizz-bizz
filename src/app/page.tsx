// Force new build 3.0
import { CartProvider } from "@/components/cart-provider";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { HouseSection } from "@/components/house-section";
import { MenuSection } from "@/components/menu-section";
import { GallerySection } from "@/components/gallery-section";
import { ReviewsSection } from "@/components/reviews-section";
import { ReserveSection } from "@/components/reserve-section";
import { SiteFooter } from "@/components/site-footer";
import {
  CartDrawer,
  CartToast,
  MobileOrderBar,
} from "@/components/cart-drawer";
import { site } from "@/lib/site";
import type { ReviewView } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const menu = [
    {
      id: 1,
      name: "Smash Burger",
      description: "Double beef patty with melted cheese",
      price: 1150,
      category: "Burgers",
      imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop",
      rating: 48,
      isSignature: true,
      slug: "smash-burger",
      tag: "Popular",
    },
    {
      id: 2,
      name: "Spicy Zinger",
      description: "Crispy chicken fillet with spicy mayo",
      price: 950,
      category: "Burgers",
      imageUrl: "https://images.unsplash.com/photo-1615297928064-24977384d0da?q=80&w=800&auto=format&fit=crop",
      rating: 45,
      isSignature: false,
      slug: "spicy-zinger",
      tag: null,
    },
    {
      id: 3,
      name: "Pepperoni Pizza",
      description: "Loaded with spicy pepperoni and mozzarella",
      price: 2200,
      category: "Pizza",
      imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
      rating: 49,
      isSignature: true,
      slug: "pepperoni-pizza",
      tag: "Chef's Special",
    },
    {
      id: 4,
      name: "Loaded Fries",
      description: "Crispy fries topped with cheese and jalapeños",
      price: 650,
      category: "Sides",
      imageUrl: "https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=800&auto=format&fit=crop",
      rating: 47,
      isSignature: false,
      slug: "loaded-fries",
      tag: null,
    },
    {
      id: 5,
      name: "Fried Chicken",
      description: "Golden fried chicken pieces",
      price: 850,
      category: "Mains",
      imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop",
      rating: 46,
      isSignature: false,
      slug: "fried-chicken",
      tag: null,
    },
    {
      id: 6,
      name: "Chocolate Shake",
      description: "Thick creamy chocolate milkshake",
      price: 550,
      category: "Drinks",
      imageUrl: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800&auto=format&fit=crop",
      rating: 50,
      isSignature: false,
      slug: "chocolate-shake",
      tag: "New",
    },
  ];

  const reviews: ReviewView[] = [
    {
      id: 1,
      name: "Ali",
      quote: "Best food in town! The smash burger is incredible.",
      rating: 5,
      role: "Customer",
      createdAt: "2026-11-08T12:00:00.000Z",
    },
    {
      id: 2,
      name: "Sara",
      quote: "Fast delivery, great taste. Highly recommended!",
      rating: 4,
      role: "Customer",
      createdAt: "2026-11-08T12:00:00.000Z",
    },
    {
      id: 3,
      name: "Hamza",
      quote: "Ambiance is great, and the pizza is a must-try.",
      rating: 5,
      role: "Customer",
      createdAt: "2026-11-08T12:00:00.000Z",
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    servesCuisine: ["Burgers", "Pizza", "Comfort food"],
    priceRange: "Rs 600 – Rs 2,500",
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: "Lahore",
      addressCountry: "PK",
    },
  };

  return (
    <CartProvider>
      <div className="relative min-h-screen bg-[#0a0806]">
        <div className="grain-overlay pointer-events-none fixed inset-0 z-[100] opacity-[0.035] mix-blend-soft-light" />

        <SiteHeader />

        <main>
          <Hero />
          <Marquee />
          <HouseSection />
          <MenuSection items={menu} />
          <GallerySection />
          <ReviewsSection initialReviews={reviews} />
          <ReserveSection />
          
          {/* NAYA LOCATION SECTION YAHAN ADD KIYA HAI */}
          <section id="location" className="relative py-20 bg-[#0a0806] border-t border-white/5">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl sm:text-4xl text-cream">
                  Find <span className="italic text-gold-gradient">Us</span>
                </h2>
                <p className="mt-4 text-mist/70 text-sm">Come visit us at our restaurant.</p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                {/* Google Map Iframe */}
                <div className="h-[400px] w-full rounded-2xl overflow-hidden border border-white/10">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3369.892529042519!2d74.3474973!3d32.3324848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391e9d8f3b6b4b4f%3A0x6b3f3b6b4b4f6b3f!2sDaska%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                {/* Contact Info Box */}
                <div className="p-8 rounded-2xl border border-white/5 bg-[#0d0b08]">
                  <h3 className="text-xl font-bold text-cream mb-6">Visit Our Restaurant</h3>
                  <div className="space-y-4 text-mist/80">
                    <p className="flex items-start gap-3">
                      <span className="text-gold">📍</span>
                      {site.address}
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="text-gold">📞</span>
                      {site.phone}
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="text-gold">🕒</span>
                      Open Daily: 12:00 PM - 12:00 AM
                    </p>
                  </div>
                  
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(site.address)}`}
                    target="_blank" 
                    className="mt-8 inline-block btn-gold text-center w-full"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </section>
          {/* LOCATION SECTION END */}

        </main>

        <SiteFooter />
        <CartDrawer />
        <CartToast />
        <MobileOrderBar />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </div>
    </CartProvider>
  );
}