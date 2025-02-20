const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {type: String, required: true},
    workingHours: {
        start: String,
        end: String
    },
    specialization: String
});

module.exports = mongoose.model('doctor' , doctorSchema);
