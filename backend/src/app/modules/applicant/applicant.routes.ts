import express from 'express';
import { ApplicantController } from './applicant.controller';
import { isAdmin, protect } from '../auth/auth.middleware';

const router = express.Router();

/* ================= PUBLIC ROUTES ================= */

router.get('/transactions', protect, ApplicantController.getAllTransactions);
router.get(
  '/total-investment',
  protect,
  ApplicantController.getTotalInvestedAmount
);

router.get('/my-portfolio', protect, ApplicantController.getMyPortfolio);

router.get('/my-transactions', protect, ApplicantController.getMyTransactions);

router.post('/start', ApplicantController.startApplication);
router.get(
  '/application/:token',
  ApplicantController.getApplicantByTokenController
);
router.put('/application/:token', ApplicantController.progressApplication);

/* ================= ADMIN ROUTES ================= */

router.post('/', protect, ApplicantController.createApplicant);
router.get('/', protect, ApplicantController.getAllApplicants);
router.get('/:id', protect, ApplicantController.getSingleApplicant);
router.put('/:id', protect, ApplicantController.updateApplicant);
router.delete('/:id', protect, ApplicantController.deleteApplicant);

// router.get('/:token', ApplicantController.getApplicantByToken);

router.post(
  '/:id/investment',
  protect,
  isAdmin,
  ApplicantController.addInvestmentController
);
router.put(
  '/:id/investment/:investmentId',
  protect,
  isAdmin,
  ApplicantController.updateInvestmentController
);

router.delete(
  '/:id/investment/:investmentId',
  protect,
  isAdmin,
  ApplicantController.deleteInvestmentController
);

router.post(
  '/:id/withdraw',
  protect,
  ApplicantController.requestWithdrawalController
);
router.patch(
  '/:id/withdraw/:withdrawalId/approve',
  protect,
  ApplicantController.approveWithdrawalController
);

router.post(
  '/:id/iposhares',
  protect,
  isAdmin,
  ApplicantController.addIPOSharesController
);

router.put(
  '/:id/iposhares/:ipoId',
  protect,
  isAdmin,
  ApplicantController.updateIPOSharesController
);

router.delete(
  '/:id/iposhares/:ipoId',
  protect,
  isAdmin,
  ApplicantController.deleteIPOSharesController
);

export const ApplicantRoutes = router;
