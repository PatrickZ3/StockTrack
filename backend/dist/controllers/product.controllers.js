"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProducts = exports.getProducts = void 0;
const product_services_1 = require("../services/product.services");
const getProducts = async (req, res) => {
    try {
        const user = req.user;
        if (!user || !user.id) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const data = await (0, product_services_1.fetchProducts)(user.id);
        return res.status(200).json({ success: true, products: data });
    }
    catch (error) {
        console.error("Get products error:", error);
        return res.status(500).json({ message: "server error" });
    }
};
exports.getProducts = getProducts;
const addProducts = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }
        const user_id = req.user.id;
        const { name, description, quantity, price, category, status } = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Product name is required",
            });
        }
        const newProduct = await (0, product_services_1.createProduct)(user_id, { name, description, quantity, price, category, status });
        res.status(201).json({
            success: true,
            message: newProduct,
        });
    }
    catch (error) {
        console.log("ERROR", error);
        res.status(400).json({
            success: false,
            message: "server error creating product"
        });
    }
};
exports.addProducts = addProducts;
