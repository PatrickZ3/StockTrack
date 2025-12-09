"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.fetchProducts = void 0;
const db_1 = require("../db");
const fetchProducts = async (user_id) => {
    const sql = `SELECT * FROM products WHERE user_id = $1 ORDER BY updated_at DESC`;
    const values = [user_id];
    const result = await (0, db_1.query)(sql, values);
    return result.rows;
};
exports.fetchProducts = fetchProducts;
const createProduct = async (user_id, data) => {
    const sql = `INSERT INTO PRODUCTS ( user_id, name, description, quantity, price, category, status)
    values ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *;`;
    const values = [user_id, data.name, data.description, data.quantity, data.price, data.category, data.status];
    const result = await (0, db_1.query)(sql, values);
    return result.rows[0];
};
exports.createProduct = createProduct;
