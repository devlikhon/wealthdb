/* eslint-disable @typescript-eslint/no-non-null-assertion */
import jwt from 'jsonwebtoken';
import config from '../config';

export const generateToken = (id: string) => {
  return jwt.sign({ id, role: 'admin' }, config.jwt.access_secret!, {
    expiresIn: '1d',
  });
};
