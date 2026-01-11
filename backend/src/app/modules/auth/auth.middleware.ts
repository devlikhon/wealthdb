/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Response, NextFunction, RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../../config';
import { AuthRequest, JwtUser } from './auth.interface';

export const protect: RequestHandler = (
  req,
  res: Response,
  next: NextFunction
) => {
  const authReq = req as AuthRequest; // 👈 cast here (important)

  const token = authReq.cookies?.token;

  if (!token) {
    res.status(401).json({ message: 'Not authorized' });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwt.access_secret!) as JwtPayload &
      JwtUser;

    authReq.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Token invalid' });
  }
};
