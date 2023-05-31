import express from "express";
import * as UserController from "../Controllers/users";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.get("/",requiresAuth, UserController.getAuthenticatedUser);
router.post("/signup", UserController.SignUp);
router.post("/login", UserController.Login);
router.post("/logout", UserController.logout);
export default router;
