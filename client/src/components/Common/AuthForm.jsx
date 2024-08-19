import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";

import "../../styles/AuthForm.css";
import Doctor from "/doc.png";
import LoginPic from "/log.png";

const AuthForm = ({ title, fields, onSubmit, buttonLabel }) => {
  const [five, setFive] = useState(null);
  const [four, setFour] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (fields.length > 2) {
      setFive(fields.slice(0, 5));
      setFour(fields.slice(5, 9));
    }
  }, [fields]);

  const handleFormSubmit = (data) => {
    onSubmit(data, reset);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: "background.paper",
        }}
      >
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            bgcolor: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 4,
          }}
        >
          <img
            src={title === "Register" ? Doctor : LoginPic}
            alt="Illustration"
            style={{ width: "100%", maxWidth: "350px", marginBottom: "2rem" }}
          />
          <Typography variant="h4" gutterBottom align="center">
            Docmate
          </Typography>
          {(title === "Register" || title === "Edit Your Profile") && (
            <Typography variant="subtitle1" gutterBottom align="center">
              Seamless Healthcare Access and Consultation at Your Fingertips.
            </Typography>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 4,
          }}
        >
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="authenticationForm"
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="100%"
              maxWidth="600px"
            >
              <Typography variant="h5" gutterBottom align="center">
                Docmate {title}
              </Typography>

              {fields.length > 2 ? (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    {five &&
                      five?.map(
                        ({ label, name, type, validation, select, options }) =>
                          select ? (
                            <TextField
                              key={name}
                              label={label}
                              select
                              fullWidth
                              margin="normal"
                              SelectProps={{ native: true }}
                              {...register(name, validation)}
                              error={!!errors[name]}
                              helperText={
                                errors[name] ? errors[name].message : ""
                              }
                              className="auth-form-field"
                            >
                              {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>
                          ) : (
                            <TextField
                              key={name}
                              label={label}
                              type={type}
                              fullWidth
                              margin="normal"
                              {...register(name, validation)}
                              error={!!errors[name]}
                              helperText={
                                errors[name] ? errors[name].message : ""
                              }
                              className="auth-form-field"
                            />
                          )
                      )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {" "}
                    {four &&
                      four?.map(
                        ({ label, name, type, validation, select, options }) =>
                          select ? (
                            <TextField
                              key={name}
                              label={label}
                              select
                              fullWidth
                              margin="normal"
                              SelectProps={{ native: true }}
                              {...register(name, validation)}
                              error={!!errors[name]}
                              helperText={
                                errors[name] ? errors[name].message : ""
                              }
                              className="auth-form-field"
                            >
                              {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>
                          ) : (
                            <TextField
                              key={name}
                              label={label}
                              type={type}
                              fullWidth
                              margin="normal"
                              {...register(name, validation)}
                              error={!!errors[name]}
                              helperText={
                                errors[name] ? errors[name].message : ""
                              }
                              className="auth-form-field"
                            />
                          )
                      )}
                  </Grid>
                </Grid>
              ) : (
                fields.map(({ label, name, type, validation }) => (
                  <TextField
                    key={name}
                    label={label}
                    type={type}
                    fullWidth
                    margin="normal"
                    {...register(name, validation)}
                    error={!!errors[name]}
                    helperText={errors[name] ? errors[name].message : ""}
                    className="auth-form-field"
                  />
                ))
              )}

              {title === "Login" && (
                <Link
                  href="#"
                  variant="body2"
                  sx={{ alignSelf: "flex-end", marginBottom: "1rem" }}
                >
                  Forgot password?
                </Link>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginBottom: "1rem", marginTop: "0.5rem" }}
              >
                {buttonLabel}
              </Button>
              {title === "Login" ? (
                <Link
                  href="/register"
                  variant="body2"
                  sx={{ marginTop: "1rem" }}
                >
                  Are you new? Create an Account
                </Link>
              ) : (
                <Link href="/login" variant="body2" sx={{ marginTop: "1rem" }}>
                  Already have an account? Login here
                </Link>
              )}
            </Box>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

AuthForm.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string,
      validation: PropTypes.object,
      select: PropTypes.bool,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};

export default AuthForm;
