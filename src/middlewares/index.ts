import unknownEndpoint from "./unknownEndpoint";
import errorHandler from "./errorHandler";
import validateRequest from "./validateRequest";
import validateSession from "./validateSession";
import validateOwnership from "./validateOwnership";

const middlewares = {
  unknownEndpoint,
  errorHandler,
  validateRequest,
  validateOwnership,
  validateSession
};

export default middlewares;
