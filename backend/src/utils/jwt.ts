import jwt from "jsonwebtoken";

// secret key to sign token
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

// generate JWT token with 7 day expiration
export const generateToken = (payload: object) => {
    return jwt.sign(payload, JWT_SECRET, {expiresIn: "7d"});
};

// veritfy jwt token - return decoded payload if valid
export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
};
