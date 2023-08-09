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

router.get("/self", authController.getCurrentUser);

router.use(middlewares.validateSession);
router.put("/self", authController.updateCurrentUser);

export default router;
