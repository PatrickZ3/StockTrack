"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = void 0;
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
