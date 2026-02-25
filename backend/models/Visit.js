/**
 * @file Visit.js
 * @description Mongoose model for salon visit records.
 *
 * Each document represents one client visit — from arrival (startTime)
 * to departure (endTime). It tracks the services performed, the artist
 * who served the client, billing details, and Razorpay payment status.
 */

const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema(
  {
    // ── Client info ──
    name: { type: String, required: true, trim: true },
    contact: { type: String, required: true, trim: true },
    age: { type: String, required: true, trim: true },      // e.g. "21-25"
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other", "prefer_not"],
    },

    // ── Timing ──
    date: { type: Date, required: true },
    startTime: { type: String, required: true }, // "HH:mm"
    endTime: { type: String, required: true },   // "HH:mm"

    // ── Service details ──
    artist: { type: String, required: true, trim: true },
    serviceType: { type: String, trim: true },
    services: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
      },
    ],
    filledBy: { type: String, required: true, trim: true },

    // ── Billing ──
    subtotal: { type: Number, required: true, min: 0 },
    discountPercent: { type: Number, default: 0, min: 0, max: 100 },
    discountAmount: { type: Number, default: 0, min: 0 },
    finalTotal: { type: Number, required: true, min: 0 },

    // ── Payment ──
    paymentMethod: {
      type: String,
      enum: ["online", "cash", "partial"],
      default: "online",
    },
    cashAmount: { type: Number, default: 0, min: 0 },
    onlineAmount: { type: Number, default: 0, min: 0 },
    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    razorpayPaymentId: { type: String, default: null },
  },
  {
    timestamps: true, // Adds createdAt & updatedAt automatically
  }
);

// Indexes for common analytics queries
visitSchema.index({ date: 1 });
visitSchema.index({ artist: 1, date: 1 });
visitSchema.index({ contact: 1 });

module.exports = mongoose.model("Visit", visitSchema);
