// import { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Grid,
//   Container,
//   CircularProgress,
//   Alert,
// } from "@mui/material";
// import { styled } from "@mui/system";

// import axiosInstance from "../../api/axiosInstance";

// // Custom styled CardContent with fixed height and flex layout
// const StyledCardContent = styled(CardContent)(({ theme }) => ({
//   height: "250px", // Fixed height for the card
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "space-between",
// }));

// const DoctorList = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await axiosInstance.get("/api/doctors");
//         console.log(response);
//         setDoctors(response.data);
//       } catch (err) {
//         setError("Failed to fetch doctors.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctors();
//   }, []);

//   if (loading)
//     return (
//       <Container>
//         <CircularProgress />
//         <Typography>Loading doctors...</Typography>
//       </Container>
//     );

//   if (error)
//     return (
//       <Container>
//         <Alert severity="error">{error}</Alert>
//       </Container>
//     );

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Available Doctors
//       </Typography>
//       <Grid container spacing={3}>
//         {doctors.length > 0 ? (
//           doctors.map((doctor) => (
//             <Grid item xs={12} sm={6} md={4} key={doctor._id}>
//               <Card>
//                 <StyledCardContent>
//                   <div>
//                     <Typography variant="h6" component="div">
//                       {doctor.name}
//                     </Typography>
//                     <Typography color="textSecondary">
//                       Specialty: {doctor.specialization}
//                     </Typography>
//                     <Typography color="textSecondary">
//                       Available Times: {doctor.availability.join(", ")}
//                     </Typography>
//                   </div>
//                   <Button variant="contained" color="primary">
//                     Select Doctor
//                   </Button>
//                 </StyledCardContent>
//               </Card>
//             </Grid>
//           ))
//         ) : (
//           <Typography>No doctors available.</Typography>
//         )}
//       </Grid>
//     </Container>
//   );
// };

// export default DoctorList;

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Container,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

import axiosInstance from "../../api/axiosInstance";

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  height: "250px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axiosInstance.get("/api/doctors");
        setDoctors(response.data);
      } catch (err) {
        setError("Failed to fetch doctors.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleSelectDoctor = (doctor) => {
    // Navigate to the appointment booking form with doctorId and doctorName
    navigate("/appointments/book", {
      state: { doctorId: doctor._id, doctorName: doctor.name },
    });
  };

  if (loading)
    return (
      <Container>
        <CircularProgress />
        <Typography>Loading doctors...</Typography>
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
        Available Doctors
      </Typography>
      <Grid container spacing={3}>
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <Grid item xs={12} sm={6} md={4} key={doctor._id}>
              <Card>
                <StyledCardContent>
                  <div>
                    <Typography variant="h6" component="div">
                      {doctor.name}
                    </Typography>
                    <Typography color="textSecondary">
                      Specialty: {doctor.specialization}
                    </Typography>
                    <Typography color="textSecondary">
                      Available Times: {doctor.availability.join(", ")}
                    </Typography>
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSelectDoctor(doctor)}
                  >
                    Select Doctor
                  </Button>
                </StyledCardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No doctors available.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default DoctorList;
