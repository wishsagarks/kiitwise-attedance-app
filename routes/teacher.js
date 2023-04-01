const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher');

router.get('/teacher-login', async (req, res) => {
  // Replace this with your own authentication and teacher fetching logic
  const teacher = await Teacher.findOne({ email: 'teacher1@example.com' });
  res.json(teacher);
});

router.post('/generateOtp', async (req, res) => {
  const { subject, section, longitude, latitude } = req.body;

  // Replace this with your own authentication and teacher fetching logic
  const teacher = await Teacher.findOne({ email: 'teacher1@example.com' });

  const otp = Math.floor(100000 + Math.random() * 900000);
  teacher.otp = otp;
  
  // Save the actual location data
  teacher.longitude = longitude;
  teacher.latitude = latitude;

  // Save the subject and section
  teacher.subject = subject;
  teacher.section = section;

  await teacher.save();

  res.json({ otp });
});

module.exports = router;
