"use strict";
// this files job
// talks to the database
// handles register logic
// handles login logic
// hashes password
// creates jwt token
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.authenticateUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../db");
const jwt_1 = require("../utils/jwt");
// export const authenticateUser = async(email:string, password:string) => {
//   const result = await query("SELECT * FROM users WHERE email = $1", [email]);
//   if (result.rows.length === 0) throw new Error("Invalid Credentials");  
//   const user = result.rows[0];
//   const match = await bcrypt.compare(password, user.password_hash);
//   if (!match) throw new Error("Invalid Credentials");
//     const token = generateToken({ id: user.id });
//     return{
//         user:{
//             id: user.id,
//             email: user.email,
//             company_name: user.company_name,
//         },
//         token,
//     };
// };
const authenticateUser = async (email, password) => {
    const result = await (0, db_1.query)("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0)
        throw new Error("Invalid Credentials");
    const user = result.rows[0];
    const match = await bcryptjs_1.default.compare(password, user.password_hash);
    if (!match)
        throw new Error("Invalid Credentials");
    const token = (0, jwt_1.generateToken)({ id: user.id });
    return {
        user: {
            id: user.id,
            email: user.email,
            company_name: user.company_name,
        },
        token,
    };
};
exports.authenticateUser = authenticateUser;
const registerUser = async (company_name, email, password) => {
    const existing = await (0, db_1.query)("SELECT * FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0)
        throw new Error("Email already exists");
    const salt = await bcryptjs_1.default.genSalt(10);
    const hashedPassword = await bcryptjs_1.default.hash(password, salt);
    const result = await (0, db_1.query)(`INSERT INTO USERS (company_name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, company_name, email`, [company_name, email, hashedPassword]);
    const newUser = result.rows[0];
    const token = (0, jwt_1.generateToken)({ id: newUser.id });
    return {
        user: newUser,
        token,
    };
};
exports.registerUser = registerUser;
