import express from 'express';
import { ApplicantController } from './applicant.controller';
import { protect } from '../auth/auth.middleware';

const router = express.Router();

/* ================= PUBLIC ROUTES ================= */

router.post('/start', ApplicantController.startApplication);
router.patch('/start/:token', ApplicantController.progressApplication);

/* ================= ADMIN ROUTES ================= */

router.post('/', protect, ApplicantController.createApplicant);
router.get('/', protect, ApplicantController.getAllApplicants);
router.get('/:id', protect, ApplicantController.getSingleApplicant);
router.patch('/:id', protect, ApplicantController.updateApplicant);
router.delete('/:id', protect, ApplicantController.deleteApplicant);

// router.get('/:token', ApplicantController.getApplicantByToken);

export const ApplicantRoutes = router;
