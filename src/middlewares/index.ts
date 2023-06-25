import unknownEndpoints from "./unknownEndpoint";
import errorHandler from "./errorHandler";
import validateRequest from "./validateRequest";

const middlewares = {
  unknownEndpoints,
  errorHandler,
  validateRequest
};

export default middlewares;
