import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  // console.error(err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      status: "error",
      message: err.issues,
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    status: "error",
    message: message,
  });
};

export default errorHandler;
