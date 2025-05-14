const jwt = require('jsonwebtoken');

/**
 * Authentication middleware
 * Verifies JWT token and adds user data to request
 */
const authMiddleware = (req, res, next) => {
  // Get token from header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token, continue as anonymous user
  if (!token) {
    return next();
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    // Add user data to request
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth error:', error.message);
    // Continue as anonymous if token is invalid
    next();
  }
};

/**
 * Session middleware for anonymous users
 * Creates or uses existing session ID
 */
const sessionMiddleware = (req, res, next) => {
  // If already authenticated, skip
  if (req.user) {
    return next();
  }

  // Get session ID from header or cookie
  const sessionId = req.header('X-Session-ID') || req.cookies?.sessionId;

  if (sessionId) {
    req.sessionID = sessionId;
  }

  next();
};

/**
 * Strict authentication middleware
 * Returns error if user is not authenticated
 */
const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  next();
};

module.exports = {
  authMiddleware,
  sessionMiddleware,
  requireAuth
};
