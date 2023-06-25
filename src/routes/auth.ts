import express, { Router } from "express";
import { authController } from "../controllers";

const router: Router = express.Router();

router.post("/signin", authController.signIn);
router.post("/signup", authController.signUp);

export default router;
