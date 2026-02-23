/**
 * @file Service.js
 * @description Mongoose model for salon services.
 *
 * Each service has a name, price, and optional category (e.g. "Haircut",
 * "Hair Colour"). Categories are derived from the distinct values of the
 * `category` field — no separate model needed.
 *
 * Only the owner can create / update / delete services.
 * Soft-delete via `isActive: false` keeps historical visit references intact.
 */

const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      trim: true,
      default: "",
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

/** Index for quick lookups in the form-data and management endpoints. */
serviceSchema.index({ isActive: 1, category: 1, name: 1 });

module.exports = mongoose.model("Service", serviceSchema);
