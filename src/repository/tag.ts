import prisma from "../configs/prisma";

const getTagById = async (id: string) => {
  const tag = await prisma.tag.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return tag;
};

const repository = {
  getTagById,
};

export default repository;
