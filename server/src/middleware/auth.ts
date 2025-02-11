import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { env } from '../config/index.js';

const protect = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!(authHeader as string)?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const token = (authHeader as string).split(' ')[1];

  const jwtAccess = env.JWT_ACCESS_TOKEN_SECRET;

  jwt.verify(token, jwtAccess, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = (decoded as JwtPayload).user.id as string;
    next();
  });
};

export default protect;
