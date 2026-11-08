import { db } from "@/db";
import { menuItems, reviews } from "./schema";
import { sql } from "drizzle-orm";

const MENU_SEED = [
  {
    slug: "le-classique",
    name: "Le Classique",
    description:
      "Double aged-cheddar smash, caramelised onion jam and our house gold sauce on a toasted brioche bun.",
    price: 1250,
    category: "Burgers",
    imageUrl:
      "/images/dish-classique.webp",
    tag: "Signature",
    rating: 49,
    isSignature: true,
    sortOrder: 1,
  },
  {
    slug: "truffle-chicken-burger",
    name: "Truffle Chicken",
    description:
      "Buttermilk-brined chicken thigh, black truffle mayo, pickled shallot and butter lettuce.",
    price: 1150,
    category: "Burgers",
    imageUrl:
      "/images/dish-truffle-chicken.webp",
    tag: "Chef's Pick",
    rating: 48,
    isSignature: true,
    sortOrder: 2,
  },
  {
    slug: "pepperoni-royale",
    name: "Pepperoni Royale",
    description:
      "Cupped pepperoni, hot honey, aged mozzarella and basil on a 48-hour cold-fermented base.",
    price: 2250,
    category: "Pizzas",
    imageUrl:
      "/images/dish-pepperoni.webp",
    tag: "Stone Baked",
    rating: 49,
    isSignature: true,
    sortOrder: 3,
  },
  {
    slug: "margherita-nobile",
    name: "Margherita Nobile",
    description:
      "San Marzano tomato, fior di latte and basil oil — a study in restraint.",
    price: 1750,
    category: "Pizzas",
    imageUrl:
      "/images/dish-margherita.webp",
    tag: null,
    rating: 47,
    isSignature: false,
    sortOrder: 4,
  },
  {
    slug: "truffle-parmesan-fries",
    name: "Truffle Parmesan",
    description:
      "Hand-cut fries tossed in black truffle oil, parmesan snow and chives.",
    price: 650,
    category: "Sides",
    imageUrl: "/images/showcase-fries.webp",
    tag: "Cult Favourite",
    rating: 49,
    isSignature: true,
    sortOrder: 5,
  },
  {
    slug: "loaded-chizz-fries",
    name: "Loaded Chizz Fries",
    description:
      "Golden fries under smoked beef, jalapeño and a molten three-cheese sauce.",
    price: 850,
    category: "Sides",
    imageUrl:
      "/images/dish-loaded-fries.webp",
    tag: "Shareable",
    rating: 48,
    isSignature: false,
    sortOrder: 6,
  },
  {
    slug: "hot-honey-chicken",
    name: "Hot Honey Chicken",
    description:
      "Three pieces of 11-spice buttermilk chicken glazed in chilli honey with slaw.",
    price: 950,
    category: "Mains",
    imageUrl:
      "/images/dish-fried-chicken.webp",
    tag: "Spicy",
    rating: 48,
    isSignature: true,
    sortOrder: 7,
  },
  {
    slug: "midnight-shake",
    name: "Midnight Shake",
    description:
      "70% Belgian chocolate, vanilla bean cream and a dusting of cocoa.",
    price: 600,
    category: "Drinks",
    imageUrl:
      "/images/dish-shake.webp",
    tag: null,
    rating: 48,
    isSignature: false,
    sortOrder: 8,
  },
];

const REVIEW_SEED = [
  {
    name: "Ahmed Khan",
    quote:
      "The Classique is the best burger I have had in Lahore, full stop. The room feels like a private members' club and the service is faultless.",
    rating: 5,
    role: "Regular · Gulberg",
  },
  {
    name: "Sara Ali",
    quote:
      "Truffle parmesan fries, a Midnight Shake and that lighting — every visit feels like a small celebration. My go-to for birthdays.",
    rating: 5,
    role: "Verified Guest",
  },
  {
    name: "Bilal Hassan",
    quote:
      "Ordered at midnight, arrived in 28 minutes, still hot. That hot honey chicken is dangerously good.",
    rating: 5,
    role: "Delivery Guest",
  },
  {
    name: "Mahira Yousaf",
    quote:
      "Finally a place that doesn't sacrifice flavour for ambience. The Margherita is restrained and perfect, the crust is textbook.",
    rating: 4,
    role: "Food Writer",
  },
  {
    name: "Usman Raza",
    quote:
      "Booked the chef's counter for an anniversary. Six courses, one incredible night. The gold-sauce burger stole the show.",
    rating: 5,
    role: "Private Dining",
  },
  {
    name: "Zainab Qureshi",
    quote:
      "Brought the whole family. Staff seated us in minutes and the kids devoured the loaded fries. Elegant without being stuffy.",
    rating: 5,
    role: "Verified Guest",
  },
];

let seedPromise: Promise<void> | null = null;

async function runSeed() {
  await db.execute(sql`select 1`);

  await db
    .insert(menuItems)
    .values(MENU_SEED)
    .onConflictDoNothing({ target: menuItems.slug });

  const [reviewCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(reviews);

  if (!reviewCount || reviewCount.count === 0) {
    await db.insert(reviews).values(REVIEW_SEED);
  }
}

export function ensureSeeded(): Promise<void> {
  if (!seedPromise) {
    seedPromise = runSeed().catch((error) => {
      seedPromise = null;
      throw error;
    });
  }
  return seedPromise;
}
