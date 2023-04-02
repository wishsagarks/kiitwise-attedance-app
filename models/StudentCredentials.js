const mongoose = require('mongoose');

const StudentCredentialsSchema = new mongoose.Schema({
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
  teacherId: {
    type: String,
    
  },
});

module.exports = mongoose.model('StudentCredentials', StudentCredentialsSchema);
