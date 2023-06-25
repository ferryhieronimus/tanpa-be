import express, { Router } from "express";
import authRouter from "./auth";
import articleRouter from "./article";

const router: Router = express.Router();

router.use("/users", authRouter);
router.use("/articles", articleRouter);

export default router;
