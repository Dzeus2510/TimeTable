import jwt from 'jsonwebtoken';
import { redisToken } from '../server';

export const authMiddleware = async (Request, Response, NextFunction) => {
    try {
        const authHeader = Request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return Response.status(401).json({ message: "Access Denied: No Token" });
        }

        const token = authHeader.split(' ')[1];

        let jwtSecretKey = process.env.JWT_SECRET_KEY;

        const verified = jwt.verify(token, jwtSecretKey);

        const userId = verified.id.toString();
        const deviceTokens = await redisToken.sMembers(`user:${userId}:tokens`);

        if (!deviceTokens || !deviceTokens.includes(token)) {
            return Response.status(401).json({ message: "Access Denied: Invalid Token" });
        }

        Request.user = verified;
        NextFunction();
        
    } catch (error) {
        return Response.status(401).json({ message: error.message });
    }
}