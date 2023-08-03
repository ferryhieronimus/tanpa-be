import { tagRepository } from "../repository";

const getTagById = async (id: string) => {
  const tag = await tagRepository.getTagById(id);
  return tag;
};

const services = {
  getTagById,
};

export default services;
