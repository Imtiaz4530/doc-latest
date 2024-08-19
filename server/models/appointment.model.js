import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value >= new Date();
        },
        message: "Appointment date must be in the future.",
      },
    },
    time: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(value);
        },
        message: "Invalid time format, should be HH:MM.",
      },
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
