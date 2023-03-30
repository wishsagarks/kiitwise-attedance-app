const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
   
    OTP: Number,
    latitude: Number,
    longitude: Number
})
module.exports = mongoose.model("Teacher" ,TeacherSchema);
