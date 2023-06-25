import prisma from "../configs/prisma";
import redis from "../configs/redis";

const createUser = async (
  username: string,
  password: string,
  email: string,
  firstName: string,
  lastName: string
) => {
  const user = await prisma.user.create({
    data: { username, password, email, firstName, lastName },
  });

  return user;
};

const findUser = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username_isDeleted: { username: username, isDeleted: false },
    },
  });

  return user;
};

const findUserOrThrow = async (username: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      username_isDeleted: { username: username, isDeleted: false },
    },
  });

  return user;
};

const storeSession = async (key: string, value: string) => {
  await redis.set(key, value);
};

const repository = {
  createUser,
  findUser,
  findUserOrThrow,
  storeSession,
};

export default repository;
