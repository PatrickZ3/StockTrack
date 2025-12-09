import { Router } from "express";
import { getProducts, addProducts, alterProducts } from "../controllers/product.controllers";
import { authMiddleware } from "../middleware/authMiddleware";


const router = Router();

router.get("/", authMiddleware, getProducts);
router.post("/", authMiddleware, addProducts);
router.put("/:id", authMiddleware, alterProducts)

export default router