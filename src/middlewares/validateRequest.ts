import { RequestHandler } from "express";
import { Unauthorized } from "../utils/errors";

const validateRequest: RequestHandler = (req, _res, next) => {
  if (req.session && req.session.userId) {
    return next();
  } else {
    throw new Unauthorized();
  }
};

export default validateRequest;
