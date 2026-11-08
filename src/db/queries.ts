import { db } from "@/db";
import { ensureSeeded } from "./seed";
import { menuItems, orderItems, orders, reservations, reviews } from "./schema";
import { asc, desc, inArray } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from "@/lib/format";
import { HttpError } from "@/lib/http-error";
import type {
  MenuItemView,
  OrderConfirmation,
  ReviewView,
} from "@/lib/types";

const MENU_COLUMNS = {
  id: menuItems.id,
  slug: menuItems.slug,
  name: menuItems.name,
  description: menuItems.description,
  price: menuItems.price,
  category: menuItems.category,
  imageUrl: menuItems.imageUrl,
  tag: menuItems.tag,
  rating: menuItems.rating,
  isSignature: menuItems.isSignature,
  sortOrder: menuItems.sortOrder,
};

export async function getMenuItems(): Promise<MenuItemView[]> {
  await ensureSeeded();
  return db.select(MENU_COLUMNS).from(menuItems).orderBy(asc(menuItems.sortOrder));
}

export async function getReviewsList(limit = 18): Promise<ReviewView[]> {
  await ensureSeeded();
  const rows = await db
    .select({
      id: reviews.id,
      name: reviews.name,
      quote: reviews.quote,
      rating: reviews.rating,
      role: reviews.role,
      createdAt: reviews.createdAt,
    })
    .from(reviews)
    .orderBy(desc(reviews.createdAt), desc(reviews.id))
    .limit(limit);

  return rows.map((row) => ({
    ...row,
    createdAt: row.createdAt.toISOString(),
  }));
}

function cleanText(value: unknown, field: string, max: number, required = true) {
  if (typeof value !== "string") {
    if (required) throw new HttpError(`${field} is required.`);
    return "";
  }
  const trimmed = value.trim().replace(/\s+/g, " ");
  if (required && trimmed.length < 2) {
    throw new HttpError(`Please enter a valid ${field.toLowerCase()}.`);
  }
  return trimmed.slice(0, max);
}

export type NewReviewInput = {
  name?: unknown;
  quote?: unknown;
  rating?: unknown;
};

export async function createReview(input: NewReviewInput): Promise<ReviewView> {
  await ensureSeeded();
  const name = cleanText(input.name, "Name", 120);
  const quote = cleanText(input.quote, "Review", 800);
  const ratingNumber = Number(input.rating);
  const rating = Number.isFinite(ratingNumber)
    ? Math.min(5, Math.max(1, Math.round(ratingNumber)))
    : 5;

  if (quote.length < 12) {
    throw new HttpError("Tell us a little more — at least 12 characters.");
  }

  const [row] = await db
    .insert(reviews)
    .values({ name, quote, rating, role: "New Guest" })
    .returning();

  return {
    id: row.id,
    name: row.name,
    quote: row.quote,
    rating: row.rating,
    role: row.role,
    createdAt: row.createdAt.toISOString(),
  };
}

export type NewOrderInput = {
  items?: unknown;
  customerName?: unknown;
  phone?: unknown;
  address?: unknown;
  notes?: unknown;
};

type NormalisedLine = { id: number; quantity: number };

function normaliseLines(raw: unknown): NormalisedLine[] {
  if (!Array.isArray(raw) || raw.length === 0) {
    throw new HttpError("Your cart is empty.");
  }

  const merged = new Map<number, number>();
  for (const entry of raw) {
    if (!entry || typeof entry !== "object") continue;
    const id = Number((entry as { id?: unknown }).id);
    const quantity = Number((entry as { quantity?: unknown }).quantity);
    if (!Number.isInteger(id) || id <= 0) continue;
    if (!Number.isFinite(quantity) || quantity <= 0) continue;
    merged.set(id, Math.min(20, (merged.get(id) ?? 0) + Math.floor(quantity)));
  }

  if (merged.size === 0) {
    throw new HttpError("Your cart is empty.");
  }

  return [...merged.entries()].map(([id, quantity]) => ({ id, quantity }));
}

export async function createOrder(input: NewOrderInput): Promise<OrderConfirmation> {
  await ensureSeeded();

  const lines = normaliseLines(input.items);
  const customerName = cleanText(input.customerName, "Full name", 120);
  const phone = cleanText(input.phone, "Phone number", 40);
  const address = cleanText(input.address, "Delivery address", 400);
  const notes =
    typeof input.notes === "string" ? input.notes.trim().slice(0, 400) : "";

  if (!/^[+\d][\d\s-]{7,19}$/.test(phone)) {
    throw new HttpError("Please enter a valid phone number (e.g. 0300 1234567).");
  }
  if (address.length < 10) {
    throw new HttpError("Please share a fuller delivery address.");
  }

  const available = await db
    .select({
      id: menuItems.id,
      name: menuItems.name,
      price: menuItems.price,
    })
    .from(menuItems)
    .where(
      inArray(
        menuItems.id,
        lines.map((line) => line.id),
      ),
    );

  if (available.length !== lines.length) {
    throw new HttpError("Some items are no longer available. Please refresh your cart.");
  }

  const pricedLines = lines.map((line) => {
    const item = available.find((entry) => entry.id === line.id);
    if (!item) throw new HttpError("Some items are no longer available.");
    return {
      menuItemId: item.id,
      name: item.name,
      unitPrice: item.price,
      quantity: line.quantity,
      lineTotal: item.price * line.quantity,
    };
  });

  const subtotal = pricedLines.reduce((sum, line) => sum + line.lineTotal, 0);
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  const orderNumber = `CB-${randomUUID().replace(/-/g, "").slice(0, 6).toUpperCase()}`;

  await db.transaction(async (tx) => {
    const [order] = await tx
      .insert(orders)
      .values({
        orderNumber,
        customerName,
        phone,
        address,
        notes: notes || null,
        subtotal,
        deliveryFee,
        total,
      })
      .returning({ id: orders.id });

    await tx.insert(orderItems).values(
      pricedLines.map((line) => ({
        orderId: order.id,
        menuItemId: line.menuItemId,
        name: line.name,
        unitPrice: line.unitPrice,
        quantity: line.quantity,
        lineTotal: line.lineTotal,
      })),
    );
  });

  return {
    orderNumber,
    customerName,
    subtotal,
    deliveryFee,
    total,
    estimatedMinutes: 35,
  };
}

export type NewReservationInput = {
  name?: unknown;
  phone?: unknown;
  guests?: unknown;
  date?: unknown;
  time?: unknown;
  occasion?: unknown;
  notes?: unknown;
};

export async function createReservation(input: NewReservationInput) {
  await ensureSeeded();

  const name = cleanText(input.name, "Name", 120);
  const phone = cleanText(input.phone, "Phone number", 40);
  const date = cleanText(input.date, "Date", 24);
  const time = cleanText(input.time, "Time", 24);
  const guests = Math.min(20, Math.max(1, Math.round(Number(input.guests) || 2)));
  const occasion =
    typeof input.occasion === "string" ? input.occasion.trim().slice(0, 80) : "";
  const notes = typeof input.notes === "string" ? input.notes.trim().slice(0, 400) : "";

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new HttpError("Please pick a valid date.");
  }
  if (!/^[+\d][\d\s-]{7,19}$/.test(phone)) {
    throw new HttpError("Please enter a valid phone number.");
  }

  const [row] = await db
    .insert(reservations)
    .values({
      name,
      phone,
      guests,
      date,
      time,
      occasion: occasion || null,
      notes: notes || null,
    })
    .returning({ id: reservations.id });

  return { id: row.id, name, guests, date, time };
}
