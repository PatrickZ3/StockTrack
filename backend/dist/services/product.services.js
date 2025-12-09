"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.editProduct = exports.createProduct = exports.fetchProducts = void 0;
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
    const values = [
        user_id,
        data.name,
        data.description,
        data.quantity,
        data.price,
        data.category,
        data.status,
    ];
    const result = await (0, db_1.query)(sql, values);
    return result.rows[0];
};
exports.createProduct = createProduct;
const editProduct = async (product_id, user_id, data) => {
    const sql = `UPDATE PRODUCTS SET name = $3, description = $4, quantity = $5, price = $6 , category = $7, status = $8
  WHERE id = $1 AND user_id = $2
  RETURNING *;`;
    const values = [
        product_id,
        user_id,
        data.name,
        data.description,
        data.quantity,
        data.price,
        data.category,
        data.status,
    ];
    const result = await (0, db_1.query)(sql, values);
    return result.rows[0];
};
exports.editProduct = editProduct;
const deleteProduct = async (product_id) => {
    const sql = `DELETE FROM products WHERE id = $1
  RETURNING *`;
    const values = [
        product_id
    ];
    const result = await (0, db_1.query)(sql, values);
    if (result.rows.length === 0) {
        return null;
    }
    return result.rows[0];
};
exports.deleteProduct = deleteProduct;
