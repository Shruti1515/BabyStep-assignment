import { Routes, Route, Link } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import AppointmentsPage from "./pages/AppointmentsPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 p-4 text-white flex justify-between">
        <h1 className="text-xl font-bold">BabySteps Booking</h1>
        <div>
          <Link to="/" className="mr-4">Doctors</Link>
          <Link to="/appointments">Appointments</Link>
        </div>
      </nav>

      <div className="p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:doctorId" element={<BookingPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
