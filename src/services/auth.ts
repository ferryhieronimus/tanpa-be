import bcrypt from "bcrypt";
import generateSessionToken from "../utils/generateSessionToken";
import { InvalidCredentials, UserAlreadyExist } from "../utils/errors";
import { authRepository } from "../repository";

const signIn = async (username: string, password: string) => {
  const user = await authRepository.findUserOrThrow(username);

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new InvalidCredentials();
  }

  const sessionToken = generateSessionToken();

  await authRepository.storeSession(sessionToken, username);

  return sessionToken;
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
    throw new UserAlreadyExist();
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await authRepository.createUser(
    username,
    passwordHash,
    email,
    firstName,
    lastName
  );
};

const services = {
  signIn,
  signUp,
};

export default services;
