import jwt from 'jsonwebtoken';
import { redisToken } from '../server';

export const authMiddleware = async (Request, Response, NextFunction) => {
    try {
        const token = Request.headers.authorization.split(' ')[1];
        if (!token) {
            return Response.status(401).json({ message: "Access Denied" });
        }

        let jwtSecretKey = process.env.JWT_SECRET_KEY;

        const verified = jwt.verify(token, jwtSecretKey);

        const redis = await redisToken.get(verified.id, token);

        if (redis == null) {
            return Response.status(401).json({ message: "Access Denied" });
        } else {
            NextFunction();
        }
    } catch (error) {
        return Response.status(401).json({ message: error.message });
    }
}