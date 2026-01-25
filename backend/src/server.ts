// import mongoose from 'mongoose';
// import app from './app';
// import config from './config';

// async function main() {
//   try {
//     await mongoose.connect(config.db_url as string);
//     console.log('Database connection established');

//     app.listen(config.port, () => {
//       console.log(`${config.port} is working`);
//     });
//   } catch (error) {
//     console.log(`${error} is here`);
//   }
// }

// main();

import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { VercelRequest, VercelResponse } from '@vercel/node';

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(config.db_url as string);
  isConnected = true;
  console.log('✅ MongoDB connected');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await connectDB();
  return app(req, res);
}
