class InvalidCredentials extends Error {
  constructor() {
    super("Invalid credentials");
    this.name = "InvalidCredentials";
  }
}

class UserAlreadyExist extends Error {
  constructor() {
    super("User with same username already exist");
    this.name = "UserAlreadyExist";
  }
}

class Unauthorized extends Error {
  constructor() {
    super("Unauthorized");
    this.name = "Unauthorized";
  }
}

export { InvalidCredentials, UserAlreadyExist, Unauthorized };
