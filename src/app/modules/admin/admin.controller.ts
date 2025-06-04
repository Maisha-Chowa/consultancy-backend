import { Request, Response } from "express";
import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

// User Management
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        admin: true,
        lawyer: true,
        client: true,
        staff: true,
      },
    });
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role, isActive } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        role: role as UserRole,
        isActive,
      },
    });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update user" });
  }
};

// Department Management
export const createDepartment = async (req: Request, res: Response) => {
  const { name, description, code } = req.body;
  try {
    const department = await prisma.department.create({
      data: {
        name,
        description,
        code,
      },
    });
    return res.json(department);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create department" });
  }
};

export const getAllDepartments = async (req: Request, res: Response) => {
  try {
    const departments = await prisma.department.findMany({
      where: {
        isActive: true,
      },
    });
    return res.json(departments);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch departments" });
  }
};

// System Management
export const getSystemStats = async (req: Request, res: Response) => {
  try {
    const [userCount, caseCount, departmentCount] = await Promise.all([
      prisma.user.count({
        where: { isDeleted: false },
      }),
      prisma.case.count(),
      prisma.department.count({
        where: { isActive: true },
      }),
    ]);

    return res.json({
      userCount,
      caseCount,
      departmentCount,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch system stats" });
  }
};
