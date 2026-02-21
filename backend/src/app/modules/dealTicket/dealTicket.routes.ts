import { Router } from 'express';
import { protect } from '../auth/auth.middleware';
import {
  createDealTicket,
  updateDealTicket,
  deleteDealTicket,
  getAllDealTickets,
  getDealTicketById,
} from './dealTicket.controller';

const router = Router();

router.post('/', protect, createDealTicket);
router.get('/', protect, getAllDealTickets);
router.get('/:id', protect, getDealTicketById);
router.put('/:id', protect, updateDealTicket);
router.delete('/:id', protect, deleteDealTicket);

export const DealTicketRoutes = router;
