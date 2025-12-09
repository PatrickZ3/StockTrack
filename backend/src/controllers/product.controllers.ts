import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { fetchProducts, createProduct } from "../services/product.services";

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

export const addProducts = async(req: AuthRequest, res: Response) => {
    try{
        if (!req.user || !req.user.id) {
            return res.status(401).json({
              success: false,
              message: "User not authenticated",
            });
          }
      
          const user_id = req.user.id;

        const {name, description, quantity, price, category, status} = req.body;

        if(!name){
            return res.status(400).json({
                success:false,
                message: "Product name is required",
            })
        }

        const newProduct = await createProduct(user_id, {name, description, quantity, price, category, status})

        res.status(201).json({
            success:true,
            message: newProduct,
        })

    }catch(error: any){
        console.log("ERROR", error)
        res.status(400).json({
            success:false,
            message:"server error creating product"
        })
    }
}