import prisma from "../configs/prisma";

const createArticle = async (data: CreateArticleParams, creatorId: string) => {
  const { title, subtitle, content, tags } = data;

  const createdArticle = await prisma.article.create({
    data: {
      title,
      subtitle,
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
      subtitle: true,
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

const getArticles = async () => {
  const tmpArticles = await prisma.article.findMany({
    select: {
      id: true,
      title: true,
      subtitle: true,
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

const getArticlesById = async (articleId: number) => {
  const tmpArticles = await prisma.article.findMany({
    where: { id: articleId },
    select: {
      id: true,
      title: true,
      subtitle: true,
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

const getArticlesByUsername = async (username: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      username_isDeleted: {
        username,
        isDeleted: false,
      },
    },
  });

  const tmpArticles = await prisma.article.findMany({
    where: { creatorId: user.id },
    select: {
      id: true,
      title: true,
      subtitle: true,
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

const getArticlesByTag = async (tag: string) => {
  const tmpArticles = await prisma.article.findMany({
    where: {
      tags: {
        some: {
          tag: {
            name: { equals: tag, mode: "insensitive" },
          },
        },
      },
    },
    select: {
      id: true,
      title: true,
      subtitle: true,
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
  articleId: number,
  data: UpdateArticleParams
) => {
  const { title, content, tags, subtitle } = data;

  // delete many-to-many relation first, then add new
  const tagName = await prisma.tagsOnArticles.findMany({
    where: {
      tagName: { in: tags },
      articleId,
    },
    select: {
      tagName: true,
    },
  });

  const tagNamesArray = tagName.map((result) => result.tagName);

  await prisma.tagsOnArticles.deleteMany({
    where: {
      tagName: { notIn: tagNamesArray },
      articleId,
    },
  });

  // does not update the 'updatedAt' field of the article if only the tags were updated
  const updatedArticle = await prisma.article.update({
    where: {
      id: articleId,
    },
    data: {
      title,
      subtitle,
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

  // temporary fix
  await prisma.$queryRaw`
  UPDATE "Article"
  SET "updatedAt" = CURRENT_TIMESTAMP
  WHERE "id" = ${articleId}`;

  // source: https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/working-with-many-to-many-relations#explicit-relations
  // might affect performance
  const arrayOfTags = updatedArticle.tags.map((tag) =>
    tag.tag ? tag.tag.name : null
  );

  return { ...updatedArticle, tags: arrayOfTags };
};

const deleteArticleById = async (articleId: number) => {
  const deletedArticle = await prisma.article.delete({
    where: {
      id: articleId,
    },
  });

  return deletedArticle;
};

const repository = {
  createArticle,
  getArticles,
  getArticlesById,
  getArticlesByUsername,
  getArticlesByTag,
  updateArticleById,
  deleteArticleById,
};

export default repository;
