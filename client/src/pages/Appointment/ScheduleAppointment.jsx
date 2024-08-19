import { Container, Button, Typography, MenuItem } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import CustomTextField from "../../components/Common/CustomTextField";
import useScheduleAppointment from "../../hooks/scheduleAppointment/useScheduleAppointment";
import LoadingSpinner from "../../components/Common/LoadingSpinner";

const ScheduleAppointment = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const history = useNavigate();

  const { doctors, loading, scheduleAppointment } = useScheduleAppointment();

  const onSubmit = (data) => {
    scheduleAppointment(data, history);
    reset();
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Schedule an Appointment
      </Typography>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="doctor"
            control={control}
            defaultValue=""
            rules={{ required: "Doctor is required" }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                select
                label="Select Doctor"
                fullWidth
                margin="normal"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={!!errors.doctor}
                helperText={errors.doctor ? errors.doctor.message : ""}
              >
                {doctors.map((doctor) => (
                  <MenuItem key={doctor._id} value={doctor._id}>
                    {doctor.name}
                  </MenuItem>
                ))}
              </CustomTextField>
            )}
          />
          <Controller
            name="date"
            control={control}
            defaultValue=""
            rules={{ required: "Date is required" }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label="Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={!!errors.date}
                helperText={errors.date ? errors.date.message : ""}
              />
            )}
          />
          <Controller
            name="time"
            control={control}
            defaultValue=""
            rules={{ required: "Time is required" }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label="Time"
                type="time"
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={!!errors.time}
                helperText={errors.time ? errors.time.message : ""}
              />
            )}
          />
          <Controller
            name="reason"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <CustomTextField
                {...field}
                label="Reason"
                fullWidth
                margin="normal"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={!!errors.reason}
                helperText={errors.reason ? errors.reason.message : ""}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            Schedule
          </Button>
        </form>
      )}
    </Container>
  );
};

export default ScheduleAppointment;
