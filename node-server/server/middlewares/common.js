// Basic error handler middleware
export function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
}

// Example: Auth middleware (expand as needed)
export function requireAuth(req, res, next) {
  // TODO: Implement real authentication logic
  // For now, allow all requests
  next();
}
