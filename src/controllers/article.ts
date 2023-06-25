import { RequestHandler } from "express";
import { articleService } from "../services";

const createArticle: RequestHandler = async (req, res) => {
  const { title, content, tags } = req.body;

  const article = await articleService.createArticle(title, content, tags, 1);

  res.status(201).send({
    status: "success",
    message: "Article was created",
    data: {
      article: article,
    },
  });
};

const controllers = {
  createArticle,
};

export default controllers;
