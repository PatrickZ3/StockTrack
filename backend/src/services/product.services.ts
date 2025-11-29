import { query } from "../db";
import { Product } from "../types/products.types";

export const fetchProducts = async (user_id: string): Promise<Product[]>  => {

    const sql = `SELECT * FROM products WHERE user_id = $1 ORDER BY updated_at DESC`
    const values = [user_id];

    const result = await query(sql, values);

    return result.rows;
}