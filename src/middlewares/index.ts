import unknownEndpoints from "./unknownEndpoint";
import errorHandler from "./errorHandler";
import validateRequest from "./validateRequest";
import validateOwnership from "./validateOwnership";

const middlewares = {
  unknownEndpoints,
  errorHandler,
  validateRequest,
  validateOwnership
};

export default middlewares;
