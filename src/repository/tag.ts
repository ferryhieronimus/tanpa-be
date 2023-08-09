import prisma from "../configs/prisma";
import slugify from "slugify";

const getTagById = async (id: string) => {
  const tag = await prisma.tag.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return tag;
};

const getTags = async () => {
  const tags = await prisma.tag.findMany({
    orderBy:{
      name: "asc"
    }
  });

  return tags;
};

const createTag = async (data: CreateTagParams) => {
  const tag = await prisma.tag.create({
    data:{
      id: slugify(data.name, { lower: true, strict: true }),
      name: data.name
    }
  });

  return tag;
};

const repository = {
  getTagById,
  getTags,
  createTag
};

export default repository;
