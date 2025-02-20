export async function getDoctors() {
    const res = await fetch("http://localhost:5000/doctors");
    return res.json();
  }
  
  export async function getAvailableSlots(doctorId, date) {
    const res = await fetch(`http://localhost:5000/doctors/${doctorId}/slots?date=${date}`);
    return res.json();
  }
  