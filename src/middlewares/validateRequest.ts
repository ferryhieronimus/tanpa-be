import { RequestHandler } from "express";
import { ZodSchema } from "zod";

const validateRequest = <T>(schema: ZodSchema<T>): RequestHandler => {
  return (req, _res, next) => {
    const data = req.body;
    schema.parse(data);
    next();
  };
};

export default validateRequest;
