import express from "express";
import { loginUser } from "../controllers/auth.controllers";
import { registerUserController } from "../controllers/auth.controllers";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUserController);

export default router;