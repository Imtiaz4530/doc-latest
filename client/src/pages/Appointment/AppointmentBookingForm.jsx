// src/components/AppointmentBookingForm.js

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import {
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Container,
} from "@mui/material";

const AppointmentBookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { doctorId, doctorName } = location.state || {};

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  if (!doctorId || !doctorName) {
    return <Typography>Doctor information is missing!</Typography>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post("/api/appointments", {
        doctor: doctorId,
        date,
        time,
        reason,
      });

      if (response.status === 201) {
        navigate("/appointments"); // Adjust the route as necessary
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          Book an Appointment with {doctorName}
        </Typography>

        <FormControl fullWidth margin="normal">
          <InputLabel>Date</InputLabel>
          <TextField
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Time</InputLabel>
          <Select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          >
            <MenuItem value="09:00">09:00 AM</MenuItem>
            <MenuItem value="10:00">10:00 AM</MenuItem>
            <MenuItem value="11:00">11:00 AM</MenuItem>
            {/* Add more time slots as necessary */}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          label="Reason for Visit"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />

        <Button type="submit" variant="contained" color="primary">
          Book Appointment
        </Button>
      </form>
    </Container>
  );
};

export default AppointmentBookingForm;
