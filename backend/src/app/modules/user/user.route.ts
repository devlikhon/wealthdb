import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/test', (req: Request, res: Response) => {
  console.log('Request body:', req.body); // Just log the request
  res.json({ success: true, message: 'Dummy response' });
});

export const UserRoutes = router;
