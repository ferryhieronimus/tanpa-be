import { RequestHandler } from "express";
import { articleService } from "../services";

const createArticle: RequestHandler = async (req, res) => {
  const data: createArticleParams = req.body;

  const article = await articleService.createArticle(data, req.session.userId!);

  res.status(201).send({
    status: "success",
    message: "Article created successfully",
    data: {
      article,
    },
  });
};

const getArticlesByCreatorId: RequestHandler = async (req, res) => {
  const { creatorId } = req.params;

  const article = await articleService.getArticlesByCreatorId(creatorId);

  res.status(200).send({
    status: "success",
    message: "Article retrieved successfully",
    data: {
      articles: article,
    },
  });
};

const updateArticleById: RequestHandler = async (req, res) => {
  const { articleId } = req.params;
  const data: updateArticleParams = req.body;

  const updatedArticle = await articleService.updateArticleById(
    articleId,
    req.session.userId!,
    data
  );

  res.status(200).send({
    status: "success",
    message: "Article updated successfully",
    data: {
      article: updatedArticle,
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
  updateArticleById,
};

export default controllers;
