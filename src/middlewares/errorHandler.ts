import { ErrorRequestHandler } from "express";
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(err.message);

  res.status(statusCode).json({
    status: "error",
    message: message,
  });
};

export default errorHandler;
