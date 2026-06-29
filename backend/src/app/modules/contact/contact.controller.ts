import { Request, Response } from 'express';
import { ContactService } from './contact.service';

const createContactController = async (req: Request, res: Response) => {
  const result = await ContactService.createContactService(req.body);

  res.status(201).json({
    success: true,
    message: 'Message sent successfully!',
    data: result,
  });
};

export const ContactController = { createContactController };
