/**
 * @file Artist.js
 * @description Mongoose model for salon artists.
 *
 * Artists are NOT user accounts — they are simple directory entries
 * that appear in the visit-entry form's "Artist" dropdown.
 *
 * Only managers and owners can create / update / delete artists.
 * Soft-delete via `isActive: false` keeps historical visit references intact.
 */

const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Artist name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      unique: true,
      validate: {
        validator: (v) => /^[6-9]\d{9}$/.test(v),
        message: "Enter a valid 10-digit Indian mobile number",
      },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

/** Index for quick lookups in the form-data endpoint. */
artistSchema.index({ isActive: 1, name: 1 });

module.exports = mongoose.model("Artist", artistSchema);
