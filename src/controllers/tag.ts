import { RequestHandler } from "express";
import { tagService } from "../services";

const getTagById: RequestHandler = async (req, res) => {
  const { tag_param } = req.params;

  const tag = await tagService.getTagById(tag_param);

  res.status(200).send({ ...tag });
};

const getTags: RequestHandler = async (req, res) => {
  const tags = await tagService.getTags();

  res.status(200).send(tags);
};

const controllers = {
  getTags,
  getTagById,
};

export default controllers;
