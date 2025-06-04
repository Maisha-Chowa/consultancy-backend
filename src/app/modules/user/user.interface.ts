import { UserRole } from "@prisma/client";

export interface CreateUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: Date;
  profileImage?: string;
}

export interface CreateAdminData extends CreateUserData {
  departmentId: string;
  permissions: string[];
}

export interface CreateLawyerData extends CreateUserData {
  specialization: string[];
  barNumber: string;
  experience: number;
}

export interface CreateStaffData extends CreateUserData {
  departmentId: string;
  position: string;
}
