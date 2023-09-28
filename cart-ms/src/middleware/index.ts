import { Request, Response, NextFunction } from "express"
import CustomError from "../errors/custom-error"
import jwt from 'jsonwebtoken';
export const errorHandler = (error: Error, req: Request, res:Response, next: NextFunction) => {
    const isProdEnv = process.env.NODE_ENV === 'production';
      if(error instanceof CustomError) {
        return res.status(error.statusCode).json({
            msg: error.message,
            data: isProdEnv ? null: error.stack
        })
      }
      return res.status(500).json({
        msg: error.message,
        data: isProdEnv ? null: error.stack
    })
}

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // Get the token from the request headers
  const token = req.header('authorization');
  // If there's no token, return a 401 Unauthorized response
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.body.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token.' });
  }
};