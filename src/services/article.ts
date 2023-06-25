import { articleRepository } from "../repository";

const createArticle = async (
  title: string,
  content: string,
  tags: string[],
  creatorId: string
) => {
  const createdArticle = await articleRepository.createArticle(
    title,
    content,
    tags,
    creatorId
  );
  return createdArticle;
};

const getArticlesByCreatorId = async (creatorId: string) => {
  const articles = await articleRepository.getArticlesByCreatorId(creatorId);
  return articles;
};

const services = {
  createArticle,
  getArticlesByCreatorId,
};

export default services;
