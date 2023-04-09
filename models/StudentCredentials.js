const mongoose = require('mongoose');

const StudentCredentialsSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  subject: {
    type: [String],
    required: true,
  },
  section: {
    type: [String],
    required: true,
  },
});

const StudentCredentials = mongoose.model('StudentCredentials', StudentCredentialsSchema);
module.exports = StudentCredentials;
