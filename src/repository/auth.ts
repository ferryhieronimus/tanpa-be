import prisma from "../configs/prisma";

const createUser = async (data: CreateUserParams) => {
  const user = await prisma.user.create({
    data,
    select: {
      id: true,
      username: true,
      email: true,
      firstName: true,
      lastName: true,
      bio: true,
    },
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

const updateUserById = async (userId: string, data: UpdateUserParams) => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data,
    select: {
      username: true,
      email: true,
      firstName: true,
      lastName: true,
      bio: true,
    },
  });

  return user;
};

const repository = {
  createUser,
  findUser,
  findUserOrThrow,
  findUserById,
  updateUserById,
};

export default repository;
