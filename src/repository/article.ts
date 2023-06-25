import prisma from "../configs/prisma";
import { UnauthorizedError } from "../utils/errors";

const createArticle = async (data: createArticleParams, creatorId: string) => {
  const { title, content, tags } = data;

  const createdArticle = await prisma.article.create({
    data: {
      title,
      content,
      creator: {
        connect: { id: creatorId },
      },
      tags: {
        create: tags.map((tagName) => ({
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

const updateArticleById = async (
  articleId: string,
  creatorId: string,
  data: updateArticleParams
) => {
  const { title, content, tags } = data;

  // prohibit user updates other's article
  const article = await prisma.article.findUniqueOrThrow({
    where: {
      id: articleId,
    },
    select: {
      creatorId: true,
    },
  });

  if (article.creatorId !== creatorId) {
    throw new UnauthorizedError();
  }

  // delete many-to-many relation first, then add new
  const tagId = await prisma.tagsOnArticles.findMany({
    where: {
      tagId: { in: tags },
      articleId,
    },
    select: {
      tagId: true,
    },
  });

  const tagIdsArray = tagId.map((result) => result.tagId);

  await prisma.tagsOnArticles.deleteMany({
    where: {
      tagId: { notIn: tagIdsArray },
      articleId,
    },
  });

  const updatedArticle = await prisma.article.update({
    where: {
      id: articleId,
    },
    data: {
      title,
      content,
      tags: {
        create: tags.map((tagName) => ({
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
  const arrayOfTags = updatedArticle.tags.map((tag) =>
    tag.tag ? tag.tag.name : null
  );

  return { ...updatedArticle, tags: arrayOfTags };
};

const deleteArticleById = async (articleId: string, creatorId: string) => {
  // prohibit user deletes other's article
  const article = await prisma.article.findUniqueOrThrow({
    where: {
      id: articleId,
    },
    select: {
      creatorId: true,
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
  updateArticleById,
  deleteArticleById,
};

export default repository;
