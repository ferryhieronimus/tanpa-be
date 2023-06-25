import { articleRepository } from "../repository";

const createArticle = async (
  title: string,
  content: string,
  tags: string[],
  _creatorId: number
) => {
  const createdArticle = await articleRepository.createArticle(
    title,
    content,
    tags,
    1
  );
  return createdArticle;
};

const services = {
  createArticle,
};

export default services;
