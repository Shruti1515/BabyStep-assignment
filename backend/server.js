require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointemntRoutes');


const app = express();
app.use(express.json);
app.use(cors());
app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`server is running on ${PORT}`));

