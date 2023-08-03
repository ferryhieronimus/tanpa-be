import express, { Router } from "express";
import middlewares from "../middlewares";
import { authController } from "../controllers";
import { createUserSchema } from "../schemas";

const router: Router = express.Router();

router.post("/signin", authController.signIn);
router.post(
  "/signup",
  middlewares.validateRequest(createUserSchema),
  authController.signUp
);
router.post("/signout", authController.signOut);

// router.use(middlewares.validateSession);
router.get("/self", authController.getCurrentUser);

export default router;
