import prisma from "../configs/prisma";
import slugify from "slugify";

const createArticle = async (data: CreateArticleParams, creatorId: string) => {
  const { title, subtitle, content, tags, coverImgURI } = data;

  const createdArticle = await prisma.article.create({
    data: {
      title,
      subtitle,
      content,
      coverImgURI,
      creator: {
        connect: { id: creatorId },
      },
      tags: {
        create: tags.map((tagName) => ({
          tag: {
            connectOrCreate: {
              where: { name: tagName },
              create: {
                name: tagName,
                id: slugify(tagName, { lower: true, strict: true }),
              },
            },
          },
        })),
      },
    },
    select: {
      title: true,
      subtitle: true,
      content: true,
      coverImgURI: true,
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

const getArticles = async (cursor: GetArticlesQuery["cursor"]) => {
  const tmpArticles = await prisma.article.findMany({
    take: 9,
    skip: cursor === "0" ? undefined : 1,
    cursor: cursor === "0" ? undefined : { id: parseInt(cursor!, 10) },
    orderBy: { id: "desc" },
    select: {
      id: true,
      title: true,
      subtitle: true,
      content: true,
      coverImgURI: true,
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

  if (tmpArticles.length !== 0) {
    return { articles, nextCursor: articles[articles.length - 1].id };
  }

  return { articles, nextCursor: undefined };
};

const getArticleById = async (articleId: number) => {
  const tmpArticle = await prisma.article.findUniqueOrThrow({
    where: { id: articleId },
    select: {
      id: true,
      title: true,
      subtitle: true,
      content: true,
      coverImgURI: true,
      createdAt: true,
      updatedAt: true,
      creator: {
        select: {
          username: true,
          firstName: true,
          lastName: true,
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
  const articles = {
    ...tmpArticle,
    tags: tmpArticle.tags.map((tag) => (tag.tag ? tag.tag.name : null)),
  };

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
      coverImgURI: true,
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

const getArticlesByTag = async (tmpTag: string) => {
  const tag = slugify(tmpTag, { strict: true });

  const tmpArticles = await prisma.article.findMany({
    where: {
      tags: {
        some: {
          tag: {
            id: { equals: tag, mode: "insensitive" },
          },
        },
      },
    },
    select: {
      id: true,
      title: true,
      subtitle: true,
      content: true,
      coverImgURI: true,
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
  const { title, content, tags, subtitle, coverImgURI } = data;

  // delete many-to-many relation first, then add new
  // const tagName = await prisma.tagsOnArticles.findMany({
  //   where: {
  //     tagName: { in: tags },
  //     articleId,
  //   },
  //   select: {
  //     tagName: true,
  //   },
  // });

  // const tagNamesArray = tagName.map((result) => result.tagName);
  // console.log(tagNamesArray);

  await prisma.tagsOnArticles.deleteMany({
    where: {
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
      coverImgURI,
      tags: {
        create: tags.map((tagName) => ({
          tag: {
            connectOrCreate: {
              where: { name: tagName },
              create: {
                name: tagName,
                id: slugify(tagName, { lower: true, strict: true }),
              },
            },
          },
        })),
      },
    },
    select: {
      id: true,
      title: true,
      content: true,
      coverImgURI: true,
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
  getArticleById,
  getArticlesByUsername,
  getArticlesByTag,
  updateArticleById,
  deleteArticleById,
};

export default repository;
