Live API- https://buildwithlikhon.vercel.app/

# How to Deploy a Node.js, Express & TypeScript Backend on Vercel – Step by Step Guide

---

## Table of Contents

- [1️⃣ Create a `vercel.json`](#1️⃣-create-a-verceljson)
- [2️⃣ Update `package.json`](#2️⃣-update-packagejson)
- [3️⃣ Update `tsconfig.json`](#3️⃣-update-tsconfigjson)
- [4️⃣ Update `server.ts` for deployment](#4️⃣-update-serverts-for-deployment)
- [5️⃣ Install Vercel Node Adapter](#5️⃣-install-vercel-node-adapter)
- [6️⃣ Deploy to Vercel (UI Steps)](#6️⃣-deploy-to-vercel-ui-steps)

---

### 1️⃣ Create a `vercel.json`

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/server.ts"
    }
  ]
}
```

### 2️⃣ Update `package.json`

- package.json should have start command and add:

```json
"engines": {
  "node": "24.x"
},
```

- Updated package.json:

```json
{
  "name": "buildwithlikhon-backend",
  "version": "1.0.0",
  "description": "",
  "main": "src/server.ts",
  "scripts": {
    "build": "tsc",
    "lint:check": "eslint --ignore-path .eslintignore --ext .js,.ts .",
    "lint:fix": "eslint . --fix",
    "prettier:check": "prettier --ignore-path .gitignore --write \"**/*.+(js|ts|json)\"",
    "prettier:fix": "prettier --write .",
    "lint-prettier": "yarn lint:check && yarn prettier:check",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "engines": {
    "node": "24.x"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "lint-staged": {
    "src/**/*.ts": "yarn lint-prettier"
  },
  "devDependencies": {
    "@types/cors": "^2.8.13",
    "@types/express": "^4.17.17",
    "@vercel/node": "^5.5.16",
    "eslint-config-prettier": "^8.8.0",
    "husky": "^8.0.3",
    "lint-staged": "^13.2.2",
    "pinst": "^3.0.0",
    "prettier": "^2.8.8",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.0.4"
  },
  "dependencies": {
    "@types/bcrypt": "^5.0.0",
    "@types/cookie-parser": "^1.4.3",
    "@types/jsonwebtoken": "^9.0.2",
    "@typescript-eslint/eslint-plugin": "^5.59.7",
    "@typescript-eslint/parser": "^5.59.7",
    "bcrypt": "^5.1.0",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "eslint": "^8.41.0",
    "express": "^4.18.2",
    "http-status": "^1.6.2",
    "jsonwebtoken": "^9.0.1",
    "mongoose": "^7.2.1",
    "winston": "^3.9.0",
    "winston-daily-rotate-file": "^4.7.1",
    "zod": "^3.21.4"
  }
}
```

### 3️⃣ Update tsconfig.json

```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */

    "target": "es2016",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

### 4️⃣ Update server.ts for deployment

- Not for local running

```json
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
```

- For local running (server.ts)

```json
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
```

### 5️⃣ Install Vercel Node Adapter

```json
npm install --save-dev @vercel/node
```

### 6️⃣ Deploy to Vercel (UI Steps)

1. Go to [vercel.com](https://vercel.com/)
2. New Project
3. Import GitHub repo
4. Root Directory → select (backend)
5. Framework → Other
6. Set Environment Variables (NODE_ENV=production)
7. Click Deploy

⏳ First deploy may take 1–2 minutes.
