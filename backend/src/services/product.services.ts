import { query } from "../db";
import { Product } from "../types/products.types";

export const fetchProducts = async (user_id: string): Promise<Product[]> => {
  const sql = `SELECT * FROM products WHERE user_id = $1 ORDER BY updated_at DESC`;
  const values = [user_id];

  const result = await query(sql, values);

  return result.rows;
};

export const createProduct = async (
  user_id: string,
  data: {
    name: string;
    description: string;
    quantity: number;
    price: number;
    category: string;
    status: string;
  }
): Promise<Product[]> => {
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

  const result = await query(sql, values);
  return result.rows[0];
};

export const editProduct = async (
  product_id: string,  
  user_id: string,
  data: {
    name: string;
    description: string;
    quantity: number;
    price: number;
    category: string;
    status: string;
  }
) : Promise<Product[]> => {
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

  const result = await query(sql, values);
  return result.rows[0];
};

export const deleteProduct = async (
  product_id: string,  
) : Promise<Product | null> => {
  const sql = `DELETE FROM products WHERE id = $1
  RETURNING *`;

  const values = [
    product_id
  ];

  const result = await query(sql, values);
  if (result.rows.length === 0){
    return null;
  }
  return result.rows[0];
};