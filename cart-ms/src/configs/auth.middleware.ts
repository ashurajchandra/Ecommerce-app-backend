import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key'; // Replace with your actual secret key

// Middleware to verify the JWT token
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // Get the token from the request headers
  const token = req.header('authorization');

  // If there's no token, return a 401 Unauthorized response
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, JWT_SECRET) as { _id: string };

    // Attach the decoded user ID to the request for further use
    // req.body.userId = decoded._id;
    req.headers['userId'] = decoded._id
    //  console.log("userId",req.userId)
    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Token verification failed
    return res.status(403).json({ error: 'Invalid token.' });
  }
};
