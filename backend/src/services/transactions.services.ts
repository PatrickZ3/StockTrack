// querying the db for transactions, joining products, manual filtering if needed

import { query } from "../db";

export const fetchAllTransactions = async () => {
  const sql = `
        SELECT
            t.id AS transaction_id,
            t.user_id,
            t.note,
            t.created_at,
            ti.id AS item_id,
            ti.product_id,
            ti.quantity_deducted,
            p.name AS product_name
        FROM transactions t
        LEFT JOIN transaction_items ti 
            ON t.id = ti.transaction_id
        LEFT JOIN products p
            ON ti.product_id = p.id
        ORDER BY t.created_at DESC;
    `;

  const result = await query(sql);
  
  const map = new Map();

  for(const row of result.rows){
    if (!map.has(row.transaction_id)){
        map.set(row.transaction_id, {
            id: row.transaction_id,
            user_id: row.user_id,
            note: row.note,
            created_at: row.created_at,
            items: []
        });
    }
    if (row.item_id){
        map.get(row.transaction_id).items.push({
            id: row.item_id,
            product_id: row.product_id,
            product_name: row.product_name,
            quantity_deducted: row.quantity_deducted
        });
    }
  }

  return Array.from(map.values());
};
