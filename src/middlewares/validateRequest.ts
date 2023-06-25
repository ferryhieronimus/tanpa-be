import { RequestHandler } from "express";
import { UnauthorizedError } from "../utils/errors";

const validateRequest: RequestHandler = (req, _res, next) => {
  if (req.session && req.session.userId) {
    return next();
  } else {
    throw new UnauthorizedError();
  }
};

export default validateRequest;
