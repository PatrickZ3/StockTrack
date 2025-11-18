import { Router } from "express";
import { query } from "../db";

const router = Router();

router.get("/", async (req, res) => {
    try{
        const result = await query(`
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'public'
            ORDER BY table_name;
            `);

        const tables = result.rows.map(row => row.table_name);
        const schema: any = {};

        for (const table of tables){
            const columnsRes = await query(`
                    SELECT * FROM ${table}
                `);

            schema[table] = columnsRes.rows;
        }

        res.json({
            success: true,
            message: "Database Connected",
            tables,
            schema
        });
    } catch (err: any){
        console.error(err);
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
});

export default router;
