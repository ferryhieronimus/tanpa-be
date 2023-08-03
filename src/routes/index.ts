import express, { Router } from "express";
import authRouter from "./auth";
import articleRouter from "./article";
import tagRouter from "./tag";

const router: Router = express.Router();

router.use("/users", authRouter);
router.use("/articles", articleRouter);
router.use("/tags", tagRouter);

export default router;
