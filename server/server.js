import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongodbConnection from "./db/mongoConnection.js";
dotenv.config();

//Routers
import authRouter from "./routes/auth.routes.js";
import profileRouter from "./routes/profile.routes.js";
import appointmentRouter from "./routes/appointment.routes.js";
import doctorRouter from "./routes/doctor.routes.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/doctors", doctorRouter);

app.use("/", (req, res) => {
  res.send("Hi.....");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  mongodbConnection();
  console.log(`The app is running on http://localhost:${PORT}`);
});
