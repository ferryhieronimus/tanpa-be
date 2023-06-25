import { ErrorRequestHandler } from "express";
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  let statusCode;
  let errorMessage;

  console.log(err.message)
  switch (err.name) {
    case "NotFoundError":
      statusCode = 404;
      errorMessage = err.message;
      break;
    case "InvalidCredentials":
      statusCode = 401;
      errorMessage = err.message;
      break;
    case "UserAlreadyExist":
      statusCode = 400;
      errorMessage = err.message;
      break;
    case "Unauthorized":
        statusCode = 403;
        errorMessage = err.message;
        break;
    default:
      statusCode = 500;
      errorMessage = "Internal server error";
      break;
  }

  res.status(statusCode).json({ status: "error", message: errorMessage });
};

export default errorHandler;
