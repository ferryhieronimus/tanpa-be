import { articleRepository } from "../repository";

const createArticle = async (data: createArticleParams, creatorId: string) => {
  const createdArticle = await articleRepository.createArticle(data, creatorId);
  return createdArticle;
};

const getArticlesByCreatorId = async (creatorId: string) => {
  const articles = await articleRepository.getArticlesByCreatorId(creatorId);
  return articles;
};

const updateArticleById = async (
  articleId: string,
  creatorId: string,
  data: updateArticleParams
) => {
  const articles = await articleRepository.updateArticleById(
    articleId,
    creatorId,
    data
  );
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
  updateArticleById,
  deleteArticleById,
};

export default services;
