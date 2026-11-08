// Database seeding bypassed for frontend deployment
// Taake Vercel par bina database ke build ho sake

export async function seedDatabase() {
  console.log("Database seeding skipped for deployment.");
  return;
}

// Agar aapke project mein koi aur function call ho raha hai toh usko bhi yahan add kar dein
export async function runSeed() {
  console.log("Database seeding skipped for deployment.");
  return;
}