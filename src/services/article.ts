import { articleRepository } from "../repository";

const createArticle = async (data: CreateArticleParams, creatorId: string) => {
  const createdArticle = await articleRepository.createArticle(data, creatorId);
  return createdArticle;
};

const getArticles = async () => {
  const articles = await articleRepository.getArticles();
  return articles;
};

const getArticlesById = async (articleId: string) => {
  const articles = await articleRepository.getArticlesById(parseInt(articleId));
  return articles;
};

const getArticlesByUsername = async (username: string) => {
  const articles = await articleRepository.getArticlesByUsername(username);
  return articles;
};

const getArticlesByTag = async (tag: string) => {
  const articles = await articleRepository.getArticlesByTag(tag);
  return articles;
};

const updateArticleById = async (
  articleId: number,
  data: UpdateArticleParams
) => {
  const articles = await articleRepository.updateArticleById(articleId, data);
  return articles;
};

const deleteArticleById = async (articleId: number) => {
  const articles = await articleRepository.deleteArticleById(articleId);
  return articles;
};

const services = {
  createArticle,
  getArticles,
  getArticlesByUsername,
  getArticlesById,
  getArticlesByTag,
  updateArticleById,
  deleteArticleById,
};

export default services;
