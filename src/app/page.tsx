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

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const menu = [
    { id: 1, name: "Smash Burger", description: "Double beef patty with melted cheese", price: 1150, category: "Burgers", imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop", rating: 48, isSignature: true, slug: "smash-burger", tag: "Popular" },
    { id: 2, name: "Spicy Zinger", description: "Crispy chicken fillet with spicy mayo", price: 950, category: "Burgers", imageUrl: "https://images.unsplash.com/photo-1615297928064-24977384d0da?q=80&w=800&auto=format&fit=crop", rating: 45, isSignature: false, slug: "spicy-zinger", tag: null },
    { id: 3, name: "Pepperoni Pizza", description: "Loaded with spicy pepperoni and mozzarella", price: 2200, category: "Pizza", imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop", rating: 49, isSignature: true, slug: "pepperoni-pizza", tag: "Chef's Special" },
    { id: 4, name: "Loaded Fries", description: "Crispy fries topped with cheese and jalapeños", price: 650, category: "Sides", imageUrl: "https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=800&auto=format&fit=crop", rating: 47, isSignature: false, slug: "loaded-fries", tag: null },
    { id: 5, name: "Fried Chicken", description: "Golden fried chicken pieces", price: 850, category: "Mains", imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop", rating: 46, isSignature: false, slug: "fried-chicken", tag: null },
    { id: 6, name: "Chocolate Shake", description: "Thick creamy chocolate milkshake", price: 550, category: "Drinks", imageUrl: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800&auto=format&fit=crop", rating: 50, isSignature: false, slug: "chocolate-shake", tag: "New" },
  ];

  const reviews = [
    { id: 1, name: "Ali", quote: "Best food in town! The smash burger is incredible.", rating: 5, role: "Customer" },
    { id: 2, name: "Sara", quote: "Fast delivery, great taste. Highly recommended!", rating: 4, role: "Customer" },
    { id: 3, name: "Hamza", quote: "Ambiance is great, and the pizza is a must-try.", rating: 5, role: "Customer" }
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
      {/* Wapas Dark Theme */}
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
        </main>

        <SiteFooter />
        <CartDrawer />
        <CartToast />
        <MobileOrderBar />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </div>
    </CartProvider>
  );
}