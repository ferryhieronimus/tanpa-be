import { tagRepository } from "../repository";

const getTagById = async (id: string) => {
  const tag = await tagRepository.getTagById(id);
  return tag;
};

const getTags = async () => {
  const tags = await tagRepository.getTags();
  return tags;
};

const services = {
  getTagById,
  getTags,
};

export default services;
