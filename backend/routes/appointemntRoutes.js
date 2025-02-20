const express = require('express');
const Appointment = require('../models/Appointment');
const router = express.Router();

// Get all appointments
router.get('/', async (req, res) => {
    const appointments = await Appointment.find().populate('doctorId');
    res.json(appointments);
});

// Create a new appointment
router.post('/', async (req, res) => {
    try {
        const { doctorId, date, duration, appointmentType, patientName, notes } = req.body;

        // Check if the slot is available
        const existing = await Appointment.findOne({ doctorId, date });
        if (existing) return res.status(400).json({ error: "Time slot already booked" });

        const newAppointment = new Appointment({ doctorId, date, duration, appointmentType, patientName, notes });
        await newAppointment.save();
        res.status(201).json(newAppointment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
