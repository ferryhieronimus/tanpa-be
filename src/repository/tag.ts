import prisma from "../configs/prisma";

const getTagById = async (id: string) => {
  const tag = await prisma.tag.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return tag;
};

const getTags = async () => {
  const tags = await prisma.tag.findMany({});

  return tags;
};

const repository = {
  getTagById,
  getTags,
};

export default repository;
