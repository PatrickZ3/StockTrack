"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controllers_1 = require("../controllers/product.controllers");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get("/", authMiddleware_1.authMiddleware, product_controllers_1.getProducts);
router.post("/", authMiddleware_1.authMiddleware, product_controllers_1.addProducts);
exports.default = router;
