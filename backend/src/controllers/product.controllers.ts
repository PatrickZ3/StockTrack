import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { fetchProducts } from "../services/product.services";

export const getProducts = async(req: AuthRequest, res: Response) => {
    try{
        const user = req.user;

        if (!user || !user.id){
            return res.status(401).json({message:"User not authenticated"})
        }

        const data = await fetchProducts(user.id);

        return res.status(200).json({success:true, products:data});

    }catch(error: any){
        console.error("Get products error:", error);
        return res.status(500).json({message: "server error"});
    }   
};