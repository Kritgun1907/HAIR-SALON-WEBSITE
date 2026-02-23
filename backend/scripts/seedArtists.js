/**
 * @file seedArtists.js
 * @description One-time script to migrate hard-coded artists into the database.
 *
 * Run once:   node scripts/seedArtists.js
 * Idempotent: skips artists whose phone number already exists.
 */

require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const connectDB = require("../db");
const Artist = require("../models/Artist");

const SEED_ARTISTS = [
  { name: "Priya Sharma", phone: "9876543210" },
  { name: "Rahul Verma", phone: "9876543211" },
  { name: "Sneha Patel", phone: "9876543212" },
  { name: "Arjun Singh", phone: "9876543213" },
  { name: "Meera Nair", phone: "9876543214" },
];

async function seed() {
  await connectDB();

  let created = 0;
  let skipped = 0;

  for (const artist of SEED_ARTISTS) {
    const existing = await Artist.findOne({ phone: artist.phone });
    if (existing) {
      console.log(`  ⏭  Skipped (exists): ${artist.name} — ${artist.phone}`);
      skipped++;
      continue;
    }
    await Artist.create(artist);
    console.log(`  ✓  Created: ${artist.name} — ${artist.phone}`);
    created++;
  }

  console.log(`\nDone: ${created} created, ${skipped} skipped.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("✗ Seed failed:", err);
  process.exit(1);
});
