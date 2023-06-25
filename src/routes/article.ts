import express, { Router } from "express";
import { articleController } from "../controllers";
import middlewares from "../middlewares";

const router: Router = express.Router();

router.post('/', middlewares.validateRequest, articleController.createArticle)
router.post('/:creatorId', middlewares.validateRequest, articleController.getArticlesByCreatorId)
router.delete('/:articleId', middlewares.validateRequest, articleController.deleteArticleById)

export default router;
