import express, { Router } from "express";
import { tagController } from "../controllers";

const router: Router = express.Router();

router.get("", tagController.getTags);
router.get("/:tag", tagController.getTagById);

export default router;
