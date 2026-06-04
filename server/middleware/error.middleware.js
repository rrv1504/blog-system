export function notFoundHandler(_req, res) {
  res.status(404).json({ message: "Route not found." });
}

export function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode || 500;

  if (statusCode === 500) {
    console.error(error);
  }

  res.status(statusCode).json({
    message: error.message || "Something went wrong."
  });
}
