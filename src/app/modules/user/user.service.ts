import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import {
  CreateAdminData,
  CreateLawyerData,
  CreateStaffData,
  CreateUserData,
} from "./user.interface";

const prisma = new PrismaClient();

// Private helper function for creating users within transactions
const createUserInTransaction = async (tx: any, userData: CreateUserData) => {
  return tx.user.create({
    data: {
      ...userData,
      password: await bcrypt.hash(userData.password, 10),
    },
  });
};

export const createAdmin = async (data: CreateAdminData) => {
  const { departmentId, permissions, ...userData } = data;

  return prisma.$transaction(async (tx) => {
    const user = await createUserInTransaction(tx, userData);

    const admin = await tx.admin.create({
      data: {
        userId: user.id,
        departmentId,
        permissions,
      },
    });

    return { user, admin };
  });
};

export const createLawyer = async (data: CreateLawyerData) => {
  const { specialization, barNumber, experience, ...userData } = data;

  return prisma.$transaction(async (tx) => {
    const user = await createUserInTransaction(tx, userData);

    const lawyer = await tx.lawyer.create({
      data: {
        userId: user.id,
        specialization,
        barNumber,
        experience,
      },
    });

    return { user, lawyer };
  });
};

export const createStaff = async (data: CreateStaffData) => {
  const { departmentId, position, ...userData } = data;

  return prisma.$transaction(async (tx) => {
    const user = await createUserInTransaction(tx, userData);

    const staff = await tx.staff.create({
      data: {
        userId: user.id,
        departmentId,
        position,
      },
    });

    return { user, staff };
  });
};

export const createClient = async (data: CreateUserData) => {
  return prisma.$transaction(async (tx) => {
    const user = await createUserInTransaction(tx, data);

    const client = await tx.client.create({
      data: {
        userId: user.id,
      },
    });

    return { user, client };
  });
};
