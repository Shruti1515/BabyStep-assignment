const express = require('express');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const { parseISO, format, addMinutes, isBefore, isEqual } = require('date-fns');

const router = express.Router();

router.get('/', async (req, res) => {
    const doctors = await Doctor.find();
    res.json(doctors);
});

// see available slots 
router.get('/:id/slots', async (req, res) => {
    try {
        const { id } = req.params;
        const { date } = req.query;

        const doctor = await Doctor.findById(id);
        if (!doctor) return res.status(404).json({ error: "Doctor not found" });

        const start = parseISO(`${date}T${doctor.workingHours.start}`);
        const end = parseISO(`${date}T${doctor.workingHours.end}`);

        let slots = [];
        let currentSlot = start;


        const appointments = await Appointment.find({ doctorId: id, date: { $gte: start, $lt: end } });

        while (isBefore(currentSlot, end)) {
            const slotEnd = addMinutes(currentSlot, 30);
            const overlapping = appointments.some(a => {
                const apptStart = new Date(a.date);
                return isEqual(apptStart, currentSlot) || (isBefore(apptStart, slotEnd) && isBefore(currentSlot, apptStart));
            });

            if (!overlapping) {
                slots.push(format(currentSlot, "HH:mm"));
            }

            currentSlot = slotEnd;
        }

        res.json(slots);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
