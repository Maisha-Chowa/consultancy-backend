import { Router } from "express";
import {
  getAllUsers,
  updateUser,
  createDepartment,
  getAllDepartments,
  getSystemStats,
} from "../modules/admin/admin.controller";
import { validateAdmin } from "../../middlewares/auth.middleware";

const router = Router();

// User Management Routes
router.get("/users", validateAdmin, getAllUsers);
router.put("/users/:id", validateAdmin, updateUser);

// Department Management Routes
router.post("/departments", validateAdmin, createDepartment);
router.get("/departments", validateAdmin, getAllDepartments);

// System Management Routes
router.get("/stats", validateAdmin, getSystemStats);

export default router;
