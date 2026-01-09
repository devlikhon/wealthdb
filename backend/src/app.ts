import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routes from './app/routes';
const app: Application = express();

// app.use(cors());
app.use(
  cors({
    origin: ['https://your-frontend-url.vercel.app', 'http://localhost:3000'], // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Optional: specify allowed methods
    credentials: true, // Optional: allow cookies/auth headers
  })
);
// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World is working');
});

export default app;
