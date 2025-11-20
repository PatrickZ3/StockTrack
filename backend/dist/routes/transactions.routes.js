"use strict";
// Defines API endpoints
// GET /api/transactions -> list all transactions logs
// does not do logic, only connects URL to controller functions
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transactions_controllers_1 = require("../controllers/transactions.controllers");
const router = (0, express_1.Router)();
router.get("/", transactions_controllers_1.getAllTransactions);
exports.default = router;
