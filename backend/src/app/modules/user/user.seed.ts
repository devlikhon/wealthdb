/* eslint-disable @typescript-eslint/no-non-null-assertion */
import mongoose from 'mongoose';
import config from '../../../config';
import { User } from './user.model';

// npm run seed:user - run command from backend folder

const seedUser = async () => {
  try {
    await mongoose.connect(config.db_url!);

    const userExists = await User.findOne({
      email: 'admin-test@crm.com',
    });

    if (userExists) {
      console.log('User already exists!');
      process.exit();
    }

    await User.create({
      email: 'oliver.patterson@wealth-db.co.uk',
      password: 'Admin-@1234oliver.pattersont',
      firstName: 'Oliver',
      lastName: 'Patterso',
      role: 'admin',
    });

    console.log('Admin created successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedUser();
