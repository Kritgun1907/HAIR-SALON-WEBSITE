/**
 * @file authMiddleware.js
 * @description Session-based authentication and role-based authorisation middleware.
 *
 * Usage in route mounting:
 *   const { authenticate, authorize } = require("./middleware/authMiddleware");
 *
 *   app.use("/api/admin", authenticate, authorize("owner"), adminRouter);
 *   app.use("/api/analytics", authenticate, authorize("manager", "owner"), analyticsRouter);
 */

/**
 * Verify that the request has an active session with a userId.
 * Returns 401 if the user is not signed in.
 */
function authenticate(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res
      .status(401)
      .json({ error: "Not authenticated. Please sign in." });
  }
  next();
}

/**
 * Factory that returns a middleware restricting access to the given roles.
 * Must be used AFTER `authenticate` so `req.session.role` is guaranteed.
 *
 * @param  {...string} roles - Allowed roles, e.g. "manager", "owner"
 * @returns {Function} Express middleware
 */
function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.session.role)) {
      return res
        .status(403)
        .json({ error: "Access denied. Insufficient permissions." });
    }
    next();
  };
}

module.exports = { authenticate, authorize };
