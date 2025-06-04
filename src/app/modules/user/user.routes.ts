import { Router } from "express";
import {
  createAdminController,
  createLawyerController,
  createStaffController,
  createClientController,
} from "./user.controller";

const router = Router();

// User creation routes
router.post("/admin", createAdminController);
router.post("/lawyer", createLawyerController);
router.post("/staff", createStaffController);
router.post("/client", createClientController);

export const userRoutes = router;
