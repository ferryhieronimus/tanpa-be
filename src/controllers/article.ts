import { RequestHandler } from "express";
import { articleService } from "../services";

const createArticle: RequestHandler = async (req, res) => {
  const { title, content, tags } = req.body;

  const article = await articleService.createArticle(
    title,
    content,
    tags,
    req.session.userId!
  );

  res.status(201).send({
    status: "success",
    message: "Article created successfully",
    data: {
      article: article,
    },
  });
};

const getArticlesByCreatorId: RequestHandler = async (req, res) => {
  const { creatorId } = req.params;

  const article = await articleService.getArticlesByCreatorId(creatorId);

  res.status(200).send({
    status: "success",
    message: "Article retrieved",
    data: {
      articles: article,
    },
  });
};

const deleteArticleById: RequestHandler = async (req, res) => {
  const { articleId } = req.params;

  await articleService.deleteArticleById(articleId, req.session.userId!);

  res.status(200).send({
    status: "success",
    message: "Article deleted successfully",
  });
};

const controllers = {
  createArticle,
  getArticlesByCreatorId,
  deleteArticleById,
};

export default controllers;
