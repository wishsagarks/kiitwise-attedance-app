const mongoose = require("mongoose");

const TeacherCredentialsSchema = new mongoose.Schema({
 
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  teacherId:  {
    _id:String,
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
  password:{
    type:String,
    required:true,
  }
});

const TeacherCredentials = mongoose.model('TeacherCredentials', TeacherCredentialsSchema);

module.exports = TeacherCredentials;
