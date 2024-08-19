import { validationResult } from "express-validator";
import Appointment from "../models/appointment.model.js";
import Doctor from "../models/doctor.model.js";

export const createAppointment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { patient, doctor, date, time, reason } = req.body;

    // Check if the doctor exists
    const existingDoctor = await Doctor.findById(doctor);
    if (!existingDoctor)
      return res.status(404).json({ message: "Doctor not found" });

    const appointment = new Appointment({
      patient,
      doctor,
      date,
      time,
      reason,
    });

    const createdAppointment = await appointment.save();
    res.status(201).json({
      message: "Appointment created successfully",
      appointment: createdAppointment,
    });
  } catch (error) {
    console.error(
      "Error in Create Appointment Controller ---> ",
      error.message
    );
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const getAppointmentsForUser = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(400).json({ error: "User ID is missing" });
    }

    const appointments = await Appointment.find({ patient: userId }).populate(
      "doctor",
      "name"
    );

    if (appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No appointments found for this user" });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error(
      "Error in Get Appointments For User Controller ---> ",
      error.message
    );
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const getAppointmentsForDoctor = async (req, res) => {
  try {
    const doctorId = req.user?._id;
    if (!doctorId) {
      return res.status(400).json({ error: "Doctor ID is missing" });
    }

    const appointments = await Appointment.find({ doctor: doctorId }).populate(
      "patient",
      "name"
    );

    if (appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No appointments found for this doctor" });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error(
      "Error in Get Appointments For Doctor Controller ---> ",
      error.message
    );
    res.status(500).json({ error: "Internal server error!" });
  }
};
