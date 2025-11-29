import { Router } from "express";
import { getProducts } from "../controllers/product.controllers";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getProducts);

export default router