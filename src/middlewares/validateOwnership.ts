import { RequestHandler } from "express";
import { UnauthorizedError } from "../utils/errors";
import prisma from "../configs/prisma";

// could possibly make it more general
const validateOwnership: RequestHandler = async (req, _res, next) => {
  const { articleId } = req.params;
  const creatorId = req.session.userId;

  const resource = await prisma.article.findUniqueOrThrow({
    where: {
      id: articleId,
    },
    select: {
      creatorId: true,
    },
  });

  if (resource.creatorId !== creatorId) {
    throw new UnauthorizedError();
  }

  next()
};

export default validateOwnership;
