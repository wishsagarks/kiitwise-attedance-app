const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    id:String,
   roll_no:String,
   Attendance:String,
    OTP:Number
})
module.exports = mongoose.model("student" , StudentSchema);