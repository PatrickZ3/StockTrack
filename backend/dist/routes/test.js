"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    try {
        const result = await (0, db_1.query)(`
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'public'
            ORDER BY table_name;
            `);
        const tables = result.rows.map(row => row.table_name);
        const schema = {};
        for (const table of tables) {
            const columnsRes = await (0, db_1.query)(`
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
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});
exports.default = router;
