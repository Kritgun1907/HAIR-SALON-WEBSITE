/**
 * @file validateId.js
 * @description Express middleware to validate that :id route params are valid
 *              MongoDB ObjectIds. Returns 400 instead of letting Mongoose throw
 *              an unhandled CastError (which surfaces as a 500).
 */

const mongoose = require("mongoose");

function validateId(req, res, next) {
  if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  next();
}

module.exports = validateId;
