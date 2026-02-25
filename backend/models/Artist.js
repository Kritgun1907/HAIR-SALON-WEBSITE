/**
 * @file Artist.js
 * @description Mongoose model for salon artists.
 *
 * Artists have an optional linked User account (role: "artist") for
 * dashboard access. They also carry commission %, registration ID,
 * and a photo URL — all managed from the owner/manager panels.
 *
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
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: null,
    },
    registrationId: {
      type: String,
      trim: true,
      default: null,
    },
    commission: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    photo: {
      type: String,
      trim: true,
      default: null,
    },
    /** Link to the User document that lets this artist sign in */
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

/** Index for quick lookups in the form-data endpoint. */
artistSchema.index({ isActive: 1, name: 1 });
artistSchema.index({ userId: 1 });
artistSchema.index({ email: 1 }, { sparse: true });

module.exports = mongoose.model("Artist", artistSchema);
