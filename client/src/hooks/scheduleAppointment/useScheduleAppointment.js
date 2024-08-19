import { useState, useEffect } from "react";
import { useStoreState } from "easy-peasy";
import toast from "react-hot-toast";

import axiosInstance from "../../api/axiosInstance";

const useScheduleAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const { _id } = useStoreState((state) => state.user);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/api/profile/doctors");
        setDoctors(response.data);
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const scheduleAppointment = async (data, history) => {
    try {
      setLoading(true);
      await axiosInstance.post("/api/appointments", { ...data, patient: _id });
      history("/patient-dashboard", { replace: true });
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    doctors,
    loading,
    scheduleAppointment,
  };
};

export default useScheduleAppointment;
