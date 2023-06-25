import unknownEndpoint from "./unknownEndpoint";
import errorHandler from "./errorHandler";
import validateRequest from "./validateRequest";
import validateOwnership from "./validateOwnership";

const middlewares = {
  unknownEndpoint,
  errorHandler,
  validateRequest,
  validateOwnership
};

export default middlewares;
