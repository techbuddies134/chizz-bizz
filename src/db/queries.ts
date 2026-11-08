
import type {
  MenuItemView,
  OrderConfirmation,
  ReviewView,
} from "@/lib/types";

// Dummy data for frontend-only deployment
const DUMMY_MENU: MenuItemView[] = [
  {
    id: 1,
    slug: "le-classique",
    name: "Le Classique",
    description:
      "Double aged-cheddar smash, caramelised onion jam and our house gold sauce.",
    price: 1250,
    category: "Burgers",
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop",
    tag: "Signature",
    rating: 49,
    isSignature: true,
    sortOrder: 1,
  },
  {
    id: 2,
    slug: "truffle-chicken-burger",
    name: "Truffle Chicken",
    description:
      "Buttermilk-brined chicken thigh, black truffle mayo, pickled shallot.",
    price: 1150,
    category: "Burgers",
    imageUrl:
      "https://images.unsplash.com/photo-1615297928064-24977384d0da?q=80&w=800&auto=format&fit=crop",
    tag: "Chef's Pick",
    rating: 48,
    isSignature: true,
    sortOrder: 2,
  },
  {
    id: 3,
    slug: "pepperoni-royale",
    name: "Pepperoni Royale",
    description:
      "Cupped pepperoni, hot honey, aged mozzarella on a 48-hour base.",
    price: 2250,
    category: "Pizzas",
    imageUrl:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
    tag: "Stone Baked",
    rating: 49,
    isSignature: true,
    sortOrder: 3,
  },
  {
    id: 4,
    slug: "margherita-nobile",
    name: "Margherita Nobile",
    description: "San Marzano tomato, fior di latte and basil oil.",
    price: 1750,
    category: "Pizzas",
    imageUrl:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop",
    tag: null,
    rating: 47,
    isSignature: false,
    sortOrder: 4,
  },
  {
    id: 5,
    slug: "truffle-parmesan-fries",
    name: "Truffle Parmesan",
    description:
      "Hand-cut fries tossed in black truffle oil, parmesan snow.",
    price: 650,
    category: "Sides",
    imageUrl:
      "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=800&auto=format&fit=crop",
    tag: "Cult Favourite",
    rating: 49,
    isSignature: true,
    sortOrder: 5,
  },
  {
    id: 6,
    slug: "hot-honey-chicken",
    name: "Hot Honey Chicken",
    description:
      "Three pieces of 11-spice buttermilk chicken glazed in chilli honey.",
    price: 950,
    category: "Mains",
    imageUrl:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop",
    tag: "Spicy",
    rating: 48,
    isSignature: true,
    sortOrder: 7,
  },
];

const DUMMY_REVIEWS: ReviewView[] = [
  {
    id: 1,
    name: "Ahmed Khan",
    quote:
      "The Classique is the best burger I have had in Lahore, full stop.",
    rating: 5,
    role: "Regular · Gulberg",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Sara Ali",
    quote:
      "Truffle parmesan fries, a Midnight Shake and that lighting — every visit feels like a small celebration.",
    rating: 5,
    role: "Verified Guest",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Bilal Hassan",
    quote:
      "Ordered at midnight, arrived in 28 minutes, still hot.",
    rating: 5,
    role: "Delivery Guest",
    createdAt: new Date().toISOString(),
  },
];

export async function getMenuItems(): Promise<MenuItemView[]> {
  return DUMMY_MENU;
}

export async function getReviewsList(
  limit = 18
): Promise<ReviewView[]> {
  return DUMMY_REVIEWS.slice(0, limit);
}

export async function createReview(
  input: any
): Promise<ReviewView> {
  return DUMMY_REVIEWS[0];
}

export async function createOrder(
  input: any
): Promise<OrderConfirmation> {
  return {
    orderNumber: "CB-DUMMY",
    customerName: "Guest",
    subtotal: 0,
    deliveryFee: 0,
    total: 0,
    estimatedMinutes: 35,
  };
}

export async function createReservation(input: any) {
  return {
    id: 1,
    name: "Guest",
    guests: 2,
    date: "2024-01-01",
    time: "12:00",
  };
}
