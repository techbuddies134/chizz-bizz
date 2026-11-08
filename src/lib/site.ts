import type { ShowcaseDish } from "./types";

export const site = {
  name: "Chizz Bizz",
  tagline: "Burger Atelier",
  phone: "+92 321 000 7788",
  whatsapp: "+92 321 000 7788",
  email: "hello@chizzbizz.pk",
  address: "24-C, MM Alam Road, Gulberg III, Lahore",
  hours: [
    { day: "Monday — Thursday", time: "12:00 — 01:00" },
    { day: "Friday — Sunday", time: "12:00 — 02:30" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "TikTok", href: "https://tiktok.com" },
  ],
  deliveryMinutes: 35,
};

export const showcaseDishes: ShowcaseDish[] = [
  {
    id: 1,
    name: "Le Classique",
    note: "Aged cheddar · caramelised onion · house gold sauce",
    price: 1250,
    image: "/images/hero-burger.webp",
    label: "House Signature",
  },
  {
    id: 2,
    name: "Pepperoni Royale",
    note: "Cupped pepperoni · hot honey · 48-hour dough",
    price: 2250,
    image: "/images/showcase-pizza.webp",
    label: "Stone Baked",
  },
  {
    id: 3,
    name: "Hot Honey Chicken",
    note: "Buttermilk brine · 11-spice crust · chilli honey",
    price: 950,
    image: "/images/showcase-chicken.webp",
    label: "Chef's Pick",
  },
  {
    id: 4,
    name: "Truffle Parmesan",
    note: "Hand-cut fries · black truffle oil · parmesan snow",
    price: 650,
    image: "/images/showcase-fries.webp",
    label: "Cult Favourite",
  },
  {
    id: 5,
    name: "Midnight Shake",
    note: "70% Belgian chocolate · vanilla bean cream",
    price: 600,
    image: "/images/showcase-shake.webp",
    label: "Sweet Finish",
  },
];

export const gallery = [
  {
    src: "/images/interior.webp",
    alt: "The candlelit dining room at Chizz Bizz",
    caption: "The dining room",
    tall: true,
  },
  {
    src: "/images/hero-burger.webp",
    alt: "Signature double cheeseburger",
    caption: "Le Classique",
    tall: false,
  },
  {
    src: "/images/gallery-burger.webp",
    alt: "Gourmet burger served with fries",
    caption: "Burger & frites",
    tall: false,
  },
  {
    src: "/images/showcase-pizza.webp",
    alt: "Pepperoni Royale pizza",
    caption: "Stone-baked pizza",
    tall: true,
  },
  {
    src: "/images/gallery-pizza.webp",
    alt: "Artisan pizza with fresh greens",
    caption: "Garden table",
    tall: false,
  },
  {
    src: "/images/showcase-shake.webp",
    alt: "Chocolate milkshake in a crystal glass",
    caption: "Midnight shake",
    tall: false,
  },
  {
    src: "/images/dish-fried-chicken.webp",
    alt: "Crispy fried chicken platter",
    caption: "Hot honey chicken",
    tall: false,
  },
  {
    src: "/images/gallery-dessert.webp",
    alt: "Over-the-top dessert shake",
    caption: "Sweet theatre",
    tall: true,
  },
];

export const marqueeWords = [
  "Dry-aged beef",
  "Hand-cut truffle fries",
  "48-hour dough",
  "Halal certified",
  "24k gold service",
  "Midnight kitchen",
];

export const navLinks = [
  { label: "The House", href: "#house" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Reserve", href: "#reserve" },
];
