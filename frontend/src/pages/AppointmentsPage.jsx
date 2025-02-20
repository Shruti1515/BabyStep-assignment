import { useEffect, useState } from "react";
import { getAppointments, deleteAppointment } from "../services/appointmentService";

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments when component loads
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const data = await getAppointments();
    setAppointments(data);
  };

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      await deleteAppointment(id);
      fetchAppointments(); // Refresh list after deletion
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Your Appointments</h2>
      {appointments.length === 0 ? (
        <p className="text-center text-gray-600">No upcoming appointments.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appt) => (
            <li key={appt._id} className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{appt.patientName}</h3>
                <p className="text-gray-600">{appt.appointmentType} with Dr. {appt.doctorName}</p>
                <p className="text-gray-500">📅 {new Date(appt.date).toLocaleString()}</p>
              </div>
              <button
                onClick={() => handleCancel(appt._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AppointmentsPage;
