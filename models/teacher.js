const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  teacherId: {
    type: String,
    required: true,
    unique: true,
  },
  subject: {
    type: [String],
    required: true,
  },
  section: {
    type: [String],
    required: true,
  },
  otp: {
    type: String,
    default: null,
  },
  longitude: {
    type: Number,
    default: null,
  },
  latitude: {
    type: Number,
    default: null,
  },
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;