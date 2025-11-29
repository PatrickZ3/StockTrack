"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchProducts = void 0;
const db_1 = require("../db");
const fetchProducts = async (user_id) => {
    const sql = `SELECT * FROM products WHERE user_id = $1 ORDER BY updated_at DESC`;
    const values = [user_id];
    const result = await (0, db_1.query)(sql, values);
    return result.rows;
};
exports.fetchProducts = fetchProducts;
