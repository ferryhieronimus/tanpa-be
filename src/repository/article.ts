import prisma from "../configs/prisma";
import { ResourceNotFoundError, UnauthorizedError } from "../utils/errors";

const createArticle = async (
  title: string,
  content: string,
  tags: string[],
  creatorId: string
) => {
  const createdArticle = await prisma.article.create({
    data: {
      title,
      content,
      creator: {
        connect: { id: creatorId },
      },
      tags: {
        create: tags.map((tagName) => ({
          assignedById: creatorId,
          tag: {
            connectOrCreate: {
              where: { name: tagName },
              create: { name: tagName },
            },
          },
        })),
      },
    },
    select: {
      title: true,
      content: true,
      tags: {
        select: {
          tag: {
            select: {
              name: true,
            },
          },
        },
      },
      createdAt: true,
    },
  });

  // source: https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/working-with-many-to-many-relations#explicit-relations
  // might affect performance
  const arrayOfTags = createdArticle.tags.map((tag) =>
    tag.tag ? tag.tag.name : null
  );

  return { ...createdArticle, tags: arrayOfTags };
};

const getArticlesByCreatorId = async (creatorId: string) => {
  await prisma.user.findUniqueOrThrow({
    where: { id: creatorId },
  });

  const tmpArticles = await prisma.article.findMany({
    where: {
      creatorId,
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      creator: {
        select: {
          username: true,
        },
      },
      tags: {
        select: {
          tag: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  // source: https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/working-with-many-to-many-relations#explicit-relations
  // might affect performance
  const articles = tmpArticles.map((article) => ({
    ...article,
    tags: article.tags.map((tag) => (tag.tag ? tag.tag.name : null)),
  }));

  return articles;
};

const deleteArticleById = async (articleId: string, creatorId: string) => {
  // prohibit user deletes other's article
  const article = await prisma.article.findUniqueOrThrow({
    where: {
      id: articleId,
    },
  });

  if (article.creatorId !== creatorId) {
    throw new UnauthorizedError();
  }

  const deletedArticle = await prisma.article.delete({
    where: {
      id: articleId,
    },
  });

  return deletedArticle;
};

const repository = {
  createArticle,
  getArticlesByCreatorId,
  deleteArticleById,
};

export default repository;
