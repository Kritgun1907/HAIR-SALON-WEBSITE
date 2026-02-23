/**
 * @file seedServices.js
 * @description One-time seed script to populate the Service collection.
 *
 * Usage:  cd backend && node scripts/seedServices.js
 *
 * Upserts services by name — safe to re-run without creating duplicates.
 * Populates the same 10 services that were previously hard-coded in index.js.
 */

require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const mongoose = require("mongoose");
const connectDB = require("../db");
const Service = require("../models/Service");

const SERVICES = [
  { name: "Classic Haircut",      price: 300,  category: "Haircut" },
  { name: "Premium Haircut",      price: 500,  category: "Haircut" },
  { name: "Global Hair Colour",   price: 1500, category: "Hair Colour" },
  { name: "Balayage",             price: 3500, category: "Highlights" },
  { name: "Keratin Smoothening",  price: 4000, category: "Keratin Treatment" },
  { name: "Blow Dry",             price: 400,  category: "Blow Dry" },
  { name: "Beard Shaping",        price: 200,  category: "Beard Trim" },
  { name: "Hair Spa",             price: 800,  category: "Hair Spa" },
  { name: "Scalp Detox",          price: 1200, category: "Scalp Treatment" },
  { name: "Full Body Waxing",     price: 1800, category: "Waxing" },
];

async function seed() {
  await connectDB();
  console.log("[seedServices] Connected to MongoDB");

  let created = 0;
  let skipped = 0;

  for (const svc of SERVICES) {
    const result = await Service.updateOne(
      { name: svc.name },
      { $setOnInsert: svc },
      { upsert: true }
    );
    if (result.upsertedCount) {
      console.log(`  ✔ Created: ${svc.name} — ₹${svc.price}`);
      created++;
    } else {
      console.log(`  – Skipped (exists): ${svc.name}`);
      skipped++;
    }
  }

  console.log(`\n[seedServices] Done — ${created} created, ${skipped} skipped`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("[seedServices] Error:", err);
  process.exit(1);
});
