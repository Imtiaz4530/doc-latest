import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to Docmate
      </Typography>
      <Typography variant="body1" paragraph>
        Docmate is your personal medical consultancy platform, allowing you to
        easily schedule appointments and manage your health records.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/login">
        Get Started
      </Button>
    </Container>
  );
};

export default HomePage;
