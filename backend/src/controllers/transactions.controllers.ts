// Handles request/ response layer
// validates input, calls service functions, returns json to the client

import { Request, Response } from "express";
import { fetchAllTransactions } from "../services/transactions.services";

export const getAllTransactions = async(req: Request, res: Response) => {
    try{
        const data = await fetchAllTransactions();
        res.json({success: true, data});
    }catch(err: any){
        res.status(500).json({ success: false, error: err.message});
    }
};