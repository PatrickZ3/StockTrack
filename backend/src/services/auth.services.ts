// this files job
// talks to the database
// handles register logic
// handles login logic
// hashes password
// creates jwt token

import bcrypt from "bcryptjs";
import {query} from "../db";
import { generateToken } from "../utils/jwt";

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

export const authenticateUser = async (email: string, password: string) => {
    const result = await query("SELECT * FROM users WHERE email = $1", [email]);
  
    if (result.rows.length === 0) throw new Error("Invalid Credentials");
  
    const user = result.rows[0];
  
    // TEMPORARY: compare plain text
    if (password !== user.password_hash) {
      throw new Error("Invalid Credentials");
    }
  
    const token = generateToken({ id: user.id });
  
    return {
      user: {
        id: user.id,
        email: user.email,
        company_name: user.company_name,
      },
      token,
    };
  };