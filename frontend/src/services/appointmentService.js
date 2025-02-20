export async function createAppointment(data) {
    const res = await fetch("http://localhost:5000/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  }
  
  export async function getAppointments() {
    const res = await fetch("http://localhost:5000/appointments");
    return res.json();
  }

  export async function deleteAppointment(id) {
    await fetch(`http://localhost:5000/appointments/${id}`, {
      method: "DELETE",
    });
  }
  
  