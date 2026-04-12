/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { ApplicantService } from './applicant.service';

/**
 * 🔹 Admin - Create Applicant
 */
const createApplicant = async (req: Request, res: Response) => {
  try {
    const result = await ApplicantService.createApplicant(
      req.body,
      req.user // from protect middleware
    );

    res.status(201).json({
      success: true,
      message: 'Applicant created & email sent successfully!',
      applicant: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * 🔹 Public - Start Application (Email Verification)
 */
const startApplication = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required!',
      });
    }

    const result = await ApplicantService.startApplication(email);

    res.status(200).json({
      success: true,
      message: 'Application found!',
      applicant: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * 🔹 Public - Complete Application
 */
const progressApplication = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    const result = await ApplicantService.progressApplication(token, req.body);

    res.status(200).json({
      success: true,
      message: 'Application completed successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * 🔹 Admin - Get All Applicants
 */
const getAllApplicants = async (_req: Request, res: Response) => {
  try {
    const result = await ApplicantService.getAllApplicants();

    res.status(200).json({
      success: true,
      count: result.length,
      applicants: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * 🔹 Admin - Get Single Applicant (by ID)
 */
const getSingleApplicant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await ApplicantService.getSingleApplicant(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Applicant not found!',
      });
    }

    res.status(200).json({
      success: true,
      applicant: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * 🔹 Admin - Update Applicant
 */
const updateApplicant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await ApplicantService.updateApplicant(id, req.body);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Applicant not found!',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Applicant updated successfully!',
      applicant: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * 🔹 Admin - Delete Applicant
 */
const deleteApplicant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await ApplicantService.deleteApplicant(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Applicant not found!',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Applicant deleted successfully!',
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const addInvestmentController = async (req: Request, res: Response) => {
  try {
    const data = await ApplicantService.addInvestment(req.params.id, req.body);
    res.status(200).json({ success: true, data });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const requestWithdrawalController = async (req: Request, res: Response) => {
  try {
    const data = await ApplicantService.requestWithdrawal(
      req.params.id,
      req.body
    );
    res.status(200).json({ success: true, data });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const approveWithdrawalController = async (req: Request, res: Response) => {
  try {
    const data = await ApplicantService.approveWithdrawal(
      req.params.id,
      req.params.withdrawalId
    );
    res.status(200).json({ success: true, data });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * 🔹 Public - Get Applicant by Token
 */
// const getApplicantByToken = async (req: Request, res: Response) => {
//   try {
//     const { token } = req.params;

//     const result = await ApplicantService.getByToken(token);

//     res.status(200).json({
//       success: true,
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const ApplicantController = {
  createApplicant,
  getAllApplicants,
  getSingleApplicant,
  updateApplicant,
  deleteApplicant,
  startApplication,
  //   getApplicantByToken,
  progressApplication,

  addInvestmentController,
  requestWithdrawalController,
  approveWithdrawalController,
};
