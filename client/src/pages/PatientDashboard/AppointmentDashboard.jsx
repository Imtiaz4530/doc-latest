import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  CircularProgress,
  Alert,
} from "@mui/material";

const AppointmentDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/appointments/patient/me"
        );
        setAppointments(response.data);
      } catch (err) {
        setError("Failed to fetch appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);
  console.log(appointments);
  if (loading)
    return (
      <Container>
        <CircularProgress />
        <Typography>Loading appointments...</Typography>
      </Container>
    );

  if (error)
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Appointments
      </Typography>
      <Grid container spacing={3}>
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <Grid item xs={12} sm={6} md={4} key={appointment._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {appointment?.doctor?.name}
                  </Typography>
                  <Typography color="textSecondary">
                    Date: {new Date(appointment?.date).toLocaleDateString()}
                  </Typography>
                  <Typography color="textSecondary">
                    Time: {appointment?.time}
                  </Typography>
                  <Typography color="textSecondary">
                    Status: {appointment?.status}
                  </Typography>
                  <Typography color="textSecondary">
                    Reason: {appointment?.reason}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No appointments found.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default AppointmentDashboard;
