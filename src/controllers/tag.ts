import { RequestHandler } from "express";
import { tagService } from "../services";

const getTagById: RequestHandler = async (req, res) => {
  const { tag } = req.params;

  const returned_tag = await tagService.getTagById(tag);

  res.status(200).send({ ...returned_tag });
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
