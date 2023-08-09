import { tagRepository } from "../repository";

const getTagById = async (id: string) => {
  const tag = await tagRepository.getTagById(id);
  
  return tag;
};

const getTags = async () => {
  const tags = await tagRepository.getTags();
  return tags;
};

const createTag = async (data: CreateTagParams) => {
  const createdArticle = await tagRepository.createTag(data);
  return createdArticle;
};

const services = {
  getTagById,
  getTags,
  createTag
};

export default services;
