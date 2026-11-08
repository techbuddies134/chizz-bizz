import { db } from ".";
import { menuItems, reviews } from "./schema";
import { sql } from "drizzle-orm";

// Database band karne ke liye:
export async function seedDatabase() {
  console.log("Database seeding skipped for preview.");
  return; 
}