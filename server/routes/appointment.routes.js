import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  createAppointment,
  getAppointmentsForDoctor,
  getAppointmentsForUser,
} from "../controllers/appointment.controller.js";
import { validateAppointment } from "../Validation/appointmentValidation.js";

const router = express.Router();

router.post("/", protectRoute, validateAppointment, createAppointment);
router.get("/patient/me", protectRoute, getAppointmentsForUser);
router.get("/doctor/:doctorId", protectRoute, getAppointmentsForDoctor);

export default router;
