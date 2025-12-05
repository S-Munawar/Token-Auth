import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import type { Request, Response, NextFunction } from 'express';
import { User } from '@/types/user';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

// Auth middleware (for protected routes)
function authMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log('Auth middleware hit');
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: 'No token provided' });

  const [, token] = authHeader.split(' '); // 'Bearer token'

  if (!token)
    return res.status(401).json({ message: 'Invalid token format' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify token and get payload
    req.user = decoded as User; // Attach user info to request
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
}

export default authMiddleware;