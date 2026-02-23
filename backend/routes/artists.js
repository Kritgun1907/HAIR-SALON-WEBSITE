/**
 * @file artists.js
 * @description CRUD routes for salon artists.
 *
 * Mounted at /api/artists in index.js.
 *
 * Access control:
 *   GET  /           — any authenticated user (for the visit form dropdown)
 *   POST /           — manager + owner
 *   PATCH /:id       — manager + owner
 *   DELETE /:id      — manager + owner (soft-delete)
 */

const express = require("express");
const { body, validationResult } = require("express-validator");
const connectDB = require("../db");
const Artist = require("../models/Artist");
const { authorize } = require("../middleware/authMiddleware");
const validateId = require("../middleware/validateId");

const router = express.Router();

// ── Ensure DB on every request (Vercel cold-start) ─────────────────────────
router.use(async (_req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("[artists] DB middleware error:", err.message);
    res.status(503).json({ error: "Database unavailable", details: err.message });
  }
});

// ─── GET / — List all active artists ────────────────────────────────────────

router.get("/", async (_req, res) => {
  try {
    const artists = await Artist.find({ isActive: true }).sort({ name: 1 });
    return res.json(artists);
  } catch (err) {
    console.error("[artists] List error:", err);
    return res.status(500).json({ error: "Failed to fetch artists" });
  }
});

// ─── GET /all — List ALL artists (including inactive) — manager + owner ─────

router.get("/all", authorize("manager", "owner"), async (_req, res) => {
  try {
    const artists = await Artist.find({}).sort({ createdAt: -1 });
    return res.json(artists);
  } catch (err) {
    console.error("[artists] List all error:", err);
    return res.status(500).json({ error: "Failed to fetch artists" });
  }
});

// ─── POST / — Create a new artist ──────────────────────────────────────────

router.post(
  "/",
  authorize("manager", "owner"),
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("phone")
      .trim()
      .notEmpty()
      .withMessage("Phone number is required")
      .matches(/^[6-9]\d{9}$/)
      .withMessage("Enter a valid 10-digit Indian mobile number"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check duplicate phone
      const existing = await Artist.findOne({ phone: req.body.phone.trim() });
      if (existing) {
        return res
          .status(409)
          .json({ error: "An artist with this phone number already exists" });
      }

      const artist = await Artist.create({
        name: req.body.name.trim(),
        phone: req.body.phone.trim(),
      });

      return res.status(201).json(artist);
    } catch (err) {
      console.error("[artists] Create error:", err);
      return res.status(500).json({ error: "Failed to create artist" });
    }
  }
);

// ─── PATCH /:id — Update an artist ─────────────────────────────────────────

router.patch(
  "/:id",
  validateId,
  authorize("manager", "owner"),
  [
    body("name")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Name cannot be empty"),
    body("phone")
      .optional()
      .trim()
      .matches(/^[6-9]\d{9}$/)
      .withMessage("Enter a valid 10-digit Indian mobile number"),
    body("isActive").optional().isBoolean().withMessage("isActive must be boolean"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;

      const artist = await Artist.findById(id);
      if (!artist) {
        return res.status(404).json({ error: "Artist not found" });
      }

      // Build update object
      const updateObj = {};
      if (req.body.name !== undefined) updateObj.name = req.body.name.trim();
      if (req.body.phone !== undefined) {
        // Check duplicate phone (excluding self)
        const dup = await Artist.findOne({
          phone: req.body.phone.trim(),
          _id: { $ne: id },
        });
        if (dup) {
          return res
            .status(409)
            .json({ error: "Another artist already has this phone number" });
        }
        updateObj.phone = req.body.phone.trim();
      }
      if (req.body.isActive !== undefined) updateObj.isActive = req.body.isActive;

      const updated = await Artist.findByIdAndUpdate(id, updateObj, { new: true });
      return res.json(updated);
    } catch (err) {
      console.error("[artists] Update error:", err);
      return res.status(500).json({ error: "Failed to update artist" });
    }
  }
);

// ─── DELETE /:id — Soft-delete an artist ────────────────────────────────────

router.delete("/:id", validateId, authorize("manager", "owner"), async (req, res) => {
  try {
    const { id } = req.params;

    const artist = await Artist.findById(id);
    if (!artist) {
      return res.status(404).json({ error: "Artist not found" });
    }

    await Artist.findByIdAndUpdate(id, { isActive: false });
    return res.json({ ok: true, message: "Artist deactivated successfully" });
  } catch (err) {
    console.error("[artists] Delete error:", err);
    return res.status(500).json({ error: "Failed to deactivate artist" });
  }
});

// ─── DELETE /:id/permanent — Hard-delete an artist from DB ──────────────────

router.delete("/:id/permanent", validateId, authorize("owner"), async (req, res) => {
  try {
    const { id } = req.params;

    const artist = await Artist.findById(id);
    if (!artist) {
      return res.status(404).json({ error: "Artist not found" });
    }

    await Artist.findByIdAndDelete(id);
    return res.json({ ok: true, message: "Artist permanently deleted" });
  } catch (err) {
    console.error("[artists] Permanent delete error:", err);
    return res.status(500).json({ error: "Failed to delete artist" });
  }
});

module.exports = router;
