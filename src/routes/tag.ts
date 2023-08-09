import express, { Router } from "express";
import { tagController } from "../controllers";
import middlewares from "../middlewares";

const router: Router = express.Router();

router.get("", tagController.getTags);
router.get("/:tag", tagController.getTagById);

router.use(middlewares.validateSession);
router.post("/", tagController.createTag);


export default router;
