const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    // user_name:String,
    // password:String,
    OTP: Number,
    latitude: Number,
    longitude: Number
})
module.exports = mongoose.model("Teacher" ,TeacherSchema);
