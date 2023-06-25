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

const deleteArticleById = async (articleId: string, creatorId: string) => {
  const articles = await articleRepository.deleteArticleById(
    articleId,
    creatorId
  );
  return articles;
};

const services = {
  createArticle,
  getArticlesByCreatorId,
  deleteArticleById,
};

export default services;
