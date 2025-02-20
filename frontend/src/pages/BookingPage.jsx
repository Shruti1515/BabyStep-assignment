import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAvailableSlots } from "../services/doctorService";
import { createAppointment } from "../services/appointmentService";

function BookingPage() {
  const { doctorId } = useParams();
  const [slots, setSlots] = useState([]);
  const [form, setForm] = useState({ patientName: "", appointmentType: "" });

  useEffect(() => {
    getAvailableSlots(doctorId, new Date().toISOString().split("T")[0]).then(setSlots);
  }, [doctorId]);

  const handleSubmit = async () => {
    await createAppointment({ ...form, doctorId, date: slots[0] });
    alert("Appointment booked!");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Book an Appointment</h2>
      <input type="text" placeholder="Patient Name" className="border p-2" onChange={(e) => setForm({ ...form, patientName: e.target.value })} />
      <button onClick={handleSubmit} className="bg-blue-600 text-white p-2 mt-2">Book</button>
    </div>
  );
}

export default BookingPage;
