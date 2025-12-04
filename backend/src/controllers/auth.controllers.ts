import { Request, Response } from "express";
import { authenticateUser, registerUser } from "../services/auth.services";

export const loginUser = async (req: Request, res: Response) => {
    try{    
        const {email, password} = req.body;

        const result = await authenticateUser(email, password);

        console.log("🔥 USER LOGGED IN:", {
            id: result.user.id,
            email: result.user.email,
            company: result.user.company_name
        });

        res.json({
            success: true,
            user: result.user,
            token: result.token,
        });


    }catch(error: any){
        res.status(400).json({success: false, message: error.message})
    }
};

export const registerUserController = async (req: Request, res: Response) => {
    try{
        const { company_name, email, password } = req.body;

        const result = await registerUser(company_name, email, password);

        console.log("User Registered", {
            id: result.user.id,
            email: result.user.email,
            company: result.user.company_name
        });

        res.json({
            success: true,
            user: result.user,
            token: result.token
        });

    }catch(error: any){
        res.status(400).json({success: false, message: error.message })
    }
}