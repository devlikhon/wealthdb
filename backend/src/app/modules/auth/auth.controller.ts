import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { Admin } from '../admin/admin.model';
import { generateToken } from '../../../utils/generateToken';

export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(admin._id.toString());

  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  });

  res.json({ message: 'Login successful' });
};

export const logoutAdmin = (_: Request, res: Response) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};
