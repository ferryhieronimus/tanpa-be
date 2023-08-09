import bcrypt from "bcrypt";
import {
  InvalidCredentialsError,
  ResourceNotFoundError,
  UserAlreadyExistError,
} from "../utils/errors";
import { authRepository } from "../repository";

const signIn = async (username: string, password: string) => {
  const user = await authRepository.findUserOrThrow(username);

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new InvalidCredentialsError();
  }

  return user;
};

const signUp = async (data: CreateUserParams) => {
  const { username, password, email, firstName, lastName, bio } = data;

  const isUserAlreadyExist = await authRepository.findUser(username);

  if (isUserAlreadyExist) {
    throw new UserAlreadyExistError();
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await authRepository.createUser({
    ...data,
    password: passwordHash,
  });

  return user;
};

const getCurrentUser = async (userId?: string) => {
  if (!userId) {
    throw new ResourceNotFoundError("User not found");
  }

  const user = await authRepository.findUserById(userId);
  return user;
};

const updateCurrentUser = async (data: UpdateUserParams, userId?: string) => {
  if (!userId) {
    throw new ResourceNotFoundError("User not found");
  }

  const user = await authRepository.updateUserById(userId, data);
  return user;
};

const services = {
  signIn,
  signUp,
  getCurrentUser,
  updateCurrentUser,
};

export default services;
