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
  
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) throw new Error("Invalid Credentials");
  
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

  export const registerUser = async (company_name: string, email: string, password: string) => {
    const existing = await query("SELECT * FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0 ) throw new Error("Email already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await query(
      `INSERT INTO USERS (company_name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, company_name, email`,
    [company_name, email, hashedPassword]);

    const newUser = result.rows[0];

    const token = generateToken({ id: newUser.id });

    return{
      user: newUser,
      token,
    };
  };