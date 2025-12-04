"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserController = exports.loginUser = void 0;
const auth_services_1 = require("../services/auth.services");
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await (0, auth_services_1.authenticateUser)(email, password);
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
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.loginUser = loginUser;
const registerUserController = async (req, res) => {
    try {
        const { company_name, email, password } = req.body;
        const result = await (0, auth_services_1.registerUser)(company_name, email, password);
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
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.registerUserController = registerUserController;
