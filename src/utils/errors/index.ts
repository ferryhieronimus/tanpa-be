class InvalidCredentialsError extends Error {
  statusCode: number;

  constructor() {
    super("Invalid credentials");
    this.name = "InvalidCredentialsError";
    this.statusCode = 401;
  }
}

class UserAlreadyExistError extends Error {
  statusCode: number;

  constructor() {
    super("User with same username already exist");
    this.name = "UserAlreadyExistError";
    this.statusCode = 400;
  }
}

class UnauthorizedError extends Error {
  statusCode: number;

  constructor() {
    super("Unauthorized");
    this.name = "UnauthorizedError";
    this.statusCode = 403;
  }
}

class ResourceNotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "ResourceNotFoundError";
    this.statusCode = 404;
  }
}

export {
  InvalidCredentialsError,
  UserAlreadyExistError,
  UnauthorizedError,
  ResourceNotFoundError,
};
