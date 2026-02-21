/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { DealTicket } from './dealTicket.model';
import { AuthRequest } from '../auth/auth.interface'; // your auth type
import { Types } from 'mongoose';

// CREATE
export const createDealTicket = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest; // cast to AuthRequest
    const data = authReq.body;

    if (!authReq.user) {
      return res
        .status(401)
        .json({ success: false, message: 'Not authorized' });
    }

    // assign logged-in admin info
    data.createdBy = new Types.ObjectId(authReq.user.id);

    // validate representative
    if (data.dealDetails.representative !== authReq.user.email) {
      return res.status(403).json({
        success: false,
        message: 'Representative must match logged-in admin email',
      });
    }

    const ticket = await DealTicket.create(data);

    return res.status(201).json({
      success: true,
      message: 'Ticket Created Successfully!',
      ticket,
    });
  } catch (err: any) {
    // console.error('CreateDealTicket error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// 🔹 GET ALL DEAL TICKETS
export const getAllDealTickets = async (req: Request, res: Response) => {
  const authReq = req as AuthRequest; // cast to AuthRequest

  try {
    if (!authReq.user) {
      return res
        .status(401)
        .json({ success: false, message: 'Not authorized' });
    }

    const tickets = await DealTicket.find()
      .populate('createdBy', 'name email role')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: tickets.length,
      tickets,
    });
  } catch (err: any) {
    console.error('GetAllDealTickets error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// 🔹 GET SINGLE DEAL TICKET BY ID
export const getDealTicketById = async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;

  try {
    if (!authReq.user) {
      return res
        .status(401)
        .json({ success: false, message: 'Not authorized' });
    }

    const ticket = await DealTicket.findById(req.params.id).populate(
      'createdBy',
      'name email role'
    );

    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: 'Ticket not found' });
    }

    return res.status(200).json({ success: true, ticket });
  } catch (err: any) {
    console.error('GetDealTicketById error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// 🔹 UPDATE DEAL TICKET
// updateDealTicket.ts
export const updateDealTicket = async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;

  try {
    if (!authReq.user) {
      return res
        .status(401)
        .json({ success: false, message: 'Not authorized' });
    }

    const ticket = await DealTicket.findById(req.params.id);
    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: 'Ticket not found' });
    }

    // representative cannot be changed
    if (
      req.body.dealDetails?.representative &&
      req.body.dealDetails.representative !== authReq.user.email
    ) {
      return res.status(403).json({
        success: false,
        message: 'Representative must match logged-in admin email',
      });
    }

    // Update only provided fields (deep merge)
    if (req.body.clientContact) {
      ticket.clientContact = {
        ...ticket.clientContact.toObject(),
        ...req.body.clientContact,
      };
    }

    if (req.body.clientAddress) {
      ticket.clientAddress = {
        ...ticket.clientAddress.toObject(),
        ...req.body.clientAddress,
      };
    }

    if (req.body.dealDetails) {
      ticket.dealDetails = {
        ...ticket.dealDetails.toObject(),
        ...req.body.dealDetails,
      };
    }

    await ticket.save();

    return res.status(200).json({
      success: true,
      message: 'Ticket Updated Successfully!',
      ticket,
    });
  } catch (err: any) {
    // console.error('UpdateDealTicket error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// 🔹 DELETE DEAL TICKET
export const deleteDealTicket = async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;

  try {
    if (!authReq.user) {
      return res
        .status(401)
        .json({ success: false, message: 'Not authorized' });
    }

    const ticket = await DealTicket.findByIdAndDelete(req.params.id);

    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: 'Ticket not found ❌' });
    }

    return res.status(200).json({
      success: true,
      message: 'Ticket deleted successfully🗑',
    });
  } catch (err: any) {
    // console.error('DeleteDealTicket error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
