import prisma from "../configs/prisma";

const createUser = async (
  username: string,
  password: string,
  email: string,
  firstName: string,
  lastName?: string
) => {
  const user = await prisma.user.create({
    data: { username, password, email, firstName, lastName },
    select: { username: true, email: true, firstName: true, lastName: true },
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

const findUserById = async (userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    select: { username: true, email: true, firstName: true, lastName: true },
  });

  return user;
};

const repository = {
  createUser,
  findUser,
  findUserOrThrow,
  findUserById,
};

export default repository;
