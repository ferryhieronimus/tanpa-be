import { ErrorRequestHandler } from "express";

const unknownEndpoints: ErrorRequestHandler = (_err, _req, res, _next) => {
  res.status(404).send({
    status: "error",
    message: "Resource not found",
  });
};

export default unknownEndpoints;
