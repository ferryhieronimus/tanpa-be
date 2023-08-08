import express, { Router } from "express";
import middlewares from "../middlewares";
import { articleController, fileController } from "../controllers";
import { createArticleSchema } from "../schemas";
import { updateArticleSchema } from "../schemas";

const router: Router = express.Router();

router.get("/", articleController.getArticles);
router.get('/generate-put-url', fileController.generatePutUrl)
router.get('/generate-get-url', fileController.generateGetUrl)
router.get("/user/:username", articleController.getArticlesByUsername);
router.get("/tag/:tag", articleController.getArticlesByTag);
router.get("/:articleId", articleController.getArticleById);

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
