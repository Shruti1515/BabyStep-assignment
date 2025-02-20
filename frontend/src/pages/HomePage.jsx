import { useEffect, useState } from "react";
import { getDoctors } from "../services/doctorService";
import { Link } from "react-router-dom";

function HomePage() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getDoctors().then(setDoctors);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">Available Doctors</h2>
      <ul className="mt-4 space-y-4">
        {doctors.map((doctor) => (
          <li key={doctor._id} className="p-4 border rounded bg-white">
            <h3 className="text-xl font-semibold">{doctor.name}</h3>
            <p>Working Hours: {doctor.workingHours.start} - {doctor.workingHours.end}</p>
            <Link to={`/book/${doctor._id}`} className="text-blue-600">Book Appointment</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
