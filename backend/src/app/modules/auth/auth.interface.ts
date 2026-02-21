import { Request } from 'express';

export type Role = 'admin' | 'user';

export type JwtUser = {
  id: string;
  email: string;
  role: Role;
  name: string;
};

// AuthRequest extends Request and allows optional user
export type AuthRequest = {
  user?: JwtUser;
} & Request;

// import type { Request } from 'express';

// export type JwtUser = {
//   id: string;
//   email: string;
//   role: 'admin' | 'user';
//   name: string;
// };

// export type AuthRequest = Request & {
//   user?: JwtUser;
// };

// Extend Request
// export type AuthRequest = {
//   user?: JwtUser; // optional at first, will be set by protect middleware
// } & Request;
