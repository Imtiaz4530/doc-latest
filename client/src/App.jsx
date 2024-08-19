import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

import "./App.css";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Profile/Profile";
import ScheduleAppointment from "./pages/Appointment/ScheduleAppointment";
import LoadingSpinner from "./components/Common/LoadingSpinner";
import PatientDashboard from "./pages/PatientDashboard/PatientDashboard";
import HomePage from "./pages/Home/HomePage";
import DoctorList from "./pages/DoctorList/DoctorList";
import AppointmentBookingForm from "./pages/Appointment/AppointmentBookingForm";
import AppointmentDashboard from "./pages/PatientDashboard/AppointmentDashboard";

const App = () => {
  const authUser = useStoreState((state) => state.user);
  const setUser = useStoreActions((actions) => actions.setUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, [setUser]);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/register"
          element={authUser ? <Navigate to={"/"} /> : <Register />}
        />
        <Route
          path="/schedule-appointment"
          element={
            authUser ? <ScheduleAppointment /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/patient-dashboard"
          element={authUser ? <PatientDashboard /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/doctors"
          element={authUser ? <DoctorList /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/appointments/book"
          element={
            authUser ? <AppointmentBookingForm /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/appointments"
          element={
            authUser ? <AppointmentDashboard /> : <Navigate to={"/login"} />
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
