import { RequestHandler } from "express";

const unknownEndpoint: RequestHandler = (_req, res, _next) => {
  res.status(404).send({
    status: "error",
    message: "Resource not found",
  });
};

export default unknownEndpoint;
