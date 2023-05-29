import express from "express";
import * as UserController from "../Controllers/users";

const router = express.Router();

router.post("/signup",UserController.SignUp);

export default router;