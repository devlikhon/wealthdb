/* eslint-disable @typescript-eslint/no-non-null-assertion */
// src/modules/auth/auth.middleware.ts
import { RequestHandler, Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../../config';
import { AuthRequest, Role } from './auth.interface';

export const protect: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authReq = req as AuthRequest; // 👈 cast here
  // let token = authReq.cookies?.token;

  const bearer = req.headers.authorization;

  let token: string | undefined;

  if (bearer?.startsWith('Bearer ')) {
    token = bearer.split(' ')[1];
  } else {
    token = authReq.cookies?.token;
  }

  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(
      token,
      config.jwt.access_secret!
    ) as JwtPayload & {
      id: string;
      email: string;
      role: Role;
      name: string;
    };
    authReq.user = decoded; // now TypeScript is happy
    next();
  } catch {
    res.status(401).json({ message: 'Token invalid!' });
  }
};

// Admin-only middleware
export const isAdmin: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authReq = req as AuthRequest; // 👈 cast here too
  if (authReq.user?.role !== 'admin')
    return res.status(403).json({ message: 'Admin access only!' });
  next();
};

// /* eslint-disable @typescript-eslint/no-non-null-assertion */
// /* eslint-disable @typescript-eslint/no-non-null-assertion */
// import { Response, NextFunction, RequestHandler } from 'express';
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import config from '../../../config';
// import { AuthRequest, JwtUser } from './auth.interface';

// export const protect: RequestHandler = (
//   req,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authReq = req as AuthRequest; // 👈 cast here (important)

//   const token = authReq.cookies?.token;

//   // console.log('Token:', authReq.cookies?.token);

//   if (!token) {
//     res.status(401).json({ message: 'Not authorized' });
//     return;
//   }

//   try {
//     const decoded = jwt.verify(token, config.jwt.access_secret!) as JwtPayload &
//       JwtUser;

//     authReq.user = decoded;
//     next();
//   } catch {
//     res.status(401).json({ message: 'Token invalid' });
//   }
// };

// import { Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { AuthRequest, JwtUser } from './auth.interface';
// import { Admin } from '../admin/admin.model';

// export const protect = async (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     token = req.headers.authorization.split(' ')[1];
//   }

//   if (!token) {
//     return res.status(401).json({ message: 'Not authorized, token missing' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtUser;

//     // fetch full admin if needed
//     const admin = await Admin.findById(decoded.id);
//     if (!admin) {
//       return res
//         .status(401)
//         .json({ message: 'Not authorized, user not found' });
//     }

//     req.user = {
//       id: admin._id.toString(),
//       email: admin.email,
//       role: admin.role,
//       name: admin.name,
//     };

//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Not authorized, token invalid' });
//   }
// };
