import { Request, Response } from "express";
import {
  createAdmin,
  createLawyer,
  createStaff,
  createClient,
} from "./user.service";
import { UserRole } from "@prisma/client";

export const createAdminController = async (req: Request, res: Response) => {
  try {
    const data = {
      ...req.body,
      role: UserRole.ADMIN,
    };
    const result = await createAdmin(data);
    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create admin",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const createLawyerController = async (req: Request, res: Response) => {
  try {
    const data = {
      ...req.body,
      role: UserRole.LAWYER,
    };
    const result = await createLawyer(data);
    res.status(201).json({
      success: true,
      message: "Lawyer created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create lawyer",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const createStaffController = async (req: Request, res: Response) => {
  try {
    const data = {
      ...req.body,
      role: UserRole.STAFF,
    };
    const result = await createStaff(data);
    res.status(201).json({
      success: true,
      message: "Staff created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create staff",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const createClientController = async (req: Request, res: Response) => {
  try {
    const data = {
      ...req.body,
      role: UserRole.CLIENT,
    };
    const result = await createClient(data);
    res.status(201).json({
      success: true,
      message: "Client created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create client",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
