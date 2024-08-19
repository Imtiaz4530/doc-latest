import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import axios from "axios";

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/appointments/patient", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(response.data);
    };
    fetchAppointments();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Your Appointments
      </Typography>
      <List>
        {appointments.map((appointment) => (
          <div key={appointment._id}>
            <ListItem>
              <ListItemText
                primary={`Appointment with Dr. ${appointment.doctor.name}`}
                secondary={`Date: ${new Date(
                  appointment.date
                ).toLocaleDateString()} - Time: ${appointment.time} - Status: ${
                  appointment.status
                }`}
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Container>
  );
};

export default PatientDashboard;
