import { RequestHandler } from "express";
import { tagService } from "../services";

const getTagById: RequestHandler = async (req, res) => {
  const { tag } = req.params;

  const returned_tag = await tagService.getTagById(tag);

  res.status(200).send({ ...returned_tag });
};

const getTags: RequestHandler = async (_req, res) => {
  const tags = await tagService.getTags();

  res.status(200).send(tags);
};

const createTag: RequestHandler = async (req, res) => {
  const data: CreateTagParams = req.body;

  const article = await tagService.createTag(data);

  res.status(201).send({ ...article });
};

const controllers = {
  getTags,
  getTagById,
  createTag
};

export default controllers;
