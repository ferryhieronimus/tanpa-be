import express, { Router } from "express";
import middlewares from "../middlewares";
import { articleController } from "../controllers";
import { createArticleSchema } from "../schemas";
import { updateArticleSchema } from "../schemas";

const router: Router = express.Router();

router.get("/:creatorId?", articleController.getArticles);
router.get("/tag/:tag", articleController.getArticlesByTag);

router.use(middlewares.validateSession);
router.post(
  "/",
  middlewares.validateRequest(createArticleSchema),
  articleController.createArticle
);
router.put(
  "/:articleId",
  middlewares.validateOwnership,
  middlewares.validateRequest(updateArticleSchema),
  articleController.updateArticleById
);
router.delete(
  "/:articleId",
  middlewares.validateOwnership,
  articleController.deleteArticleById
);

export default router;
