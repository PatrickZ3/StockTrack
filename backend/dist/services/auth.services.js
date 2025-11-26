"use strict";
// this files job
// talks to the database
// handles register logic
// handles login logic
// hashes password
// creates jwt token
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
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
    // TEMPORARY: compare plain text
    if (password !== user.password_hash) {
        throw new Error("Invalid Credentials");
    }
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
