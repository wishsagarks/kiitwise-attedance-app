const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  teacherId: {
    type: String,
    
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
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Student', StudentSchema);
