"use strict";
// Handles request/ response layer
// validates input, calls service functions, returns json to the client
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTransactions = void 0;
const transactions_services_1 = require("../services/transactions.services");
const getAllTransactions = async (req, res) => {
    try {
        const data = await (0, transactions_services_1.fetchAllTransactions)();
        res.json({ success: true, data });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
exports.getAllTransactions = getAllTransactions;
