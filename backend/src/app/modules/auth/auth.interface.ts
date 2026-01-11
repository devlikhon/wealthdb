import type { Request } from 'express';

export type JwtUser = {
  id: string;
  email: string;
  role: 'admin' | 'user';
};

export type AuthRequest = Request & {
  user?: JwtUser;
};
