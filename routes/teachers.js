const express = require('express');
const router = express.Router();
const TeacherCredentials = require('../models/TeacherCredentials');
const Teacher = require('../models/teacher');


router.get('/details/:teacherId', async (req, res) => {
  try {
    const teacher = await TeacherCredentials.findById(req.params.teacherId);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



router.patch('/:teacherId/generateOTP', async (req, res) => {
  const teacherId = req.params.teacherId;
  const { subject, section, otp, latitude, longitude } = req.body;

  try {
    const teacher = await Teacher.findOne({ teacherId });
    if (teacher) {
      teacher.subject = subject;
      teacher.section = section;
      teacher.otp = otp;
      teacher.latitude = latitude;
      teacher.longitude = longitude;
      await teacher.save();
      res.json({ message: 'OTP and location updated successfully', otp });
    } else {
      res.status(404).json({ message: 'Teacher not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating teacher data' });
  }
});


module.exports = router;
