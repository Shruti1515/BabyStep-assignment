const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    docterId: {type: mongoose.Schema.Types.ObjectId, ref: 'doctor', required:true},
    date: {type: Date, required: ture},
    duration: {type: Number, required: true},
    appointmentType: { type: String, required: true},
    patientName: {type: String, reuired: true},
    notes: String
});

module.exports = mongoose.model('appointment', appointmentSchema)