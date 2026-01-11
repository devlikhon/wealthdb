import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { Admin } from '../admin/admin.model';
import { generateToken } from '../../../utils/generateToken';

export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log('Password:', password);

  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin) {
    return res.status(401).json({ message: 'Invalid credentials 1' });
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  console.log('isMatch:', isMatch);

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials 2' });
  }

  const token = generateToken(
    admin._id.toString(),
    admin.email,
    admin.role as 'admin' | 'user'
  );

  // res.cookie('token', token, {
  //   httpOnly: true,
  //   secure: false,
  //   sameSite: 'strict',
  // });

  res.cookie('token', token, {
    httpOnly: true,
    secure: false, // use true in production with HTTPS
    sameSite: 'none', // required for cross-domain cookies
  });

  console.log('Token set in cookie:', token);

  res.json({ message: 'Login successful' });
};

export const logoutAdmin = (_: Request, res: Response) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out succesfully!' });
};
