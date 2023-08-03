import { RequestHandler } from "express";
import { tagService } from "../services";

const getTagById: RequestHandler = async (req, res) => {
  const { tag } = req.params;

  const article = await tagService.getTagById(tag);

  res.status(200).send({ ...article });
};

const controllers = {
  getTagById,
};

export default controllers;
