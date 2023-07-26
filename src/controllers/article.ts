import { RequestHandler } from "express";
import { articleService } from "../services";

const createArticle: RequestHandler = async (req, res) => {
  const data: CreateArticleParams = req.body;

  const article = await articleService.createArticle(data, req.session.userId!);

  res.status(201).send({
    status: "success",
    message: "Article created successfully",
    data: {
      article,
    },
  });
};

const getArticles: RequestHandler = async (req, res) => {
  const { creatorId } = req.params;

  const article = await articleService.getArticles(creatorId);

  res.status(200).send({
    status: "success",
    message: "Article retrieved successfully",
    data: {
      articles: article,
    },
  });
};

const getArticlesByTag: RequestHandler = async (req, res) => {
  const { tag } = req.params;

  const article = await articleService.getArticlesByTag(tag);

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
  const data: UpdateArticleParams = req.body;

  const updatedArticle = await articleService.updateArticleById(
    parseInt(articleId),
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

  await articleService.deleteArticleById(parseInt(articleId));

  res.status(200).send({
    status: "success",
    message: "Article deleted successfully",
  });
};

const controllers = {
  createArticle,
  getArticles,
  deleteArticleById,
  updateArticleById,
  getArticlesByTag
};

export default controllers;
