// Defines API endpoints
// GET /api/transactions -> list all transactions logs
// does not do logic, only connects URL to controller functions

import { Router } from "express";
import { getAllTransactions } from "../controllers/transactions.controllers";

const router = Router();

router.get("/", getAllTransactions);

export default router;