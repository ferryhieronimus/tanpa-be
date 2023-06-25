import bcrypt from "bcrypt";
import { InvalidCredentialsError, UserAlreadyExistError } from "../utils/errors";
import { authRepository } from "../repository";

const signIn = async (username: string, password: string) => {
  const user = await authRepository.findUserOrThrow(username);

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new InvalidCredentialsError();
  }

  return user;
};

const signUp = async (
  username: string,
  password: string,
  email: string,
  firstName: string,
  lastName: string
) => {
  const isUserAlreadyExist = await authRepository.findUser(username);

  if (isUserAlreadyExist) {
    throw new UserAlreadyExistError();
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = await authRepository.createUser(
    username,
    passwordHash,
    email,
    firstName,
    lastName
  );

  return user
};

const services = {
  signIn,
  signUp,
};

export default services;
