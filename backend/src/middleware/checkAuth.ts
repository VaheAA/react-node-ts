import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors';

interface UserData {
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      userData?: UserData;
    }
  }
}

export default function (req: Request, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('Authentication failed');
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string; };
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new UnauthenticatedError('Authentication failed!');
    return next(error);
  }
}