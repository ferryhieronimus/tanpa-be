import { RequestHandler } from "express";
import { articleService } from "../services";

const createArticle: RequestHandler = async (req, res) => {
  const data: CreateArticleParams = req.body;

  const article = await articleService.createArticle(data, req.session.userId!);

  res.status(201).send({ ...article });
};

const getArticles: RequestHandler = async (req, res) => {
  const { cursor } = req.query as GetArticlesQuery;
  
  const articles = await articleService.getArticles(cursor);

  res.status(200).send( articles );
};

const getArticlesByUsername: RequestHandler = async (req, res) => {
  const { username } = req.params;

  const articles = await articleService.getArticlesByUsername(username);

  res.status(200).send({ articles });
};

const getArticleById: RequestHandler = async (req, res) => {
  const { articleId } = req.params;

  const article = await articleService.getArticleById(articleId);

  res.status(200).send({ ...article });
};

const getArticlesByTag: RequestHandler = async (req, res) => {
  const { tag } = req.params;

  const articles = await articleService.getArticlesByTag(tag);

  res.status(200).send({ articles });
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
  getArticlesByUsername,
  getArticlesByTag,
  getArticleById,
  deleteArticleById,
  updateArticleById,
};

export default controllers;
