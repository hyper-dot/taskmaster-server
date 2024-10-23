import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from './utils/exceptions';
import { IRequestWithUser } from './types/express';

export const isAuthencticated = (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  let token = req.headers.authorization;
  if (!token) {
    throw new UnauthorizedError('Token is required');
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trim();
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log({ decoded });
    req.userId = (decoded as any).id;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
