import { Router } from "express";
import { getProducts, addProducts } from "../controllers/product.controllers";
import { authMiddleware } from "../middleware/authMiddleware";


const router = Router();

router.get("/", authMiddleware, getProducts);
router.post("/", authMiddleware, addProducts)

export default router