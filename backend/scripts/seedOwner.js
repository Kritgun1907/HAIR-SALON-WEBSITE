/**
 * @file seedOwner.js
 * @description One-time script to create the initial owner account.
 *
 * Reads credentials from environment variables:
 *   OWNER_EMAIL    (required)
 *   OWNER_PASSWORD (required)
 *
 * Run once:   node scripts/seedOwner.js
 *
 * NOTE: The server also auto-creates/updates the owner on every startup
 *       (see ensureOwner() in index.js), so this script is only needed
 *       for manual one-off seeding.
 */

require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("../db");
const User = require("../models/User");

async function seed() {
  const ownerEmail = process.env.OWNER_EMAIL;
  const ownerPassword = process.env.OWNER_PASSWORD;
  const ownerName = "Salon Owner";

  if (!ownerEmail || !ownerPassword) {
    console.error("✗ OWNER_EMAIL and OWNER_PASSWORD must be set in .env");
    process.exit(1);
  }

  await connectDB();

  const existing = await User.findOne({ role: "owner" });
  if (existing) {
    // Update existing owner to match env vars
    existing.name = ownerName;
    existing.email = ownerEmail;
    existing.passwordHash = await bcrypt.hash(ownerPassword, 12);
    existing.isActive = true;
    await existing.save();
    console.log("✓ Owner updated:", ownerEmail);
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(ownerPassword, 12);

  const owner = await User.create({
    name: ownerName,
    email: ownerEmail,
    passwordHash,
    role: "owner",
  });

  console.log("✓ Owner created:", owner.email);
  process.exit(0);
}

seed().catch((err) => {
  console.error("✗ Seed failed:", err);
  process.exit(1);
});
