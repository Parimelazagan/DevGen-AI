export function notFoundHandler(req, res) {
  res.status(404).json({ error: 'API route not found.', code: 'NOT_FOUND' });
}

export function errorHandler(error, req, res, next) {
  console.error('[API Error]:', error.message || error);

  if (res.headersSent) {
    return next(error);
  }

  const status = error.status || error.statusCode || 500;
  const isClientError = status >= 400 && status < 500;
  return res.status(status).json({
    error: isClientError ? error.message : 'An unexpected server error occurred. Please try again.',
    code: isClientError ? 'BAD_REQUEST' : 'INTERNAL_ERROR',
  });
}
