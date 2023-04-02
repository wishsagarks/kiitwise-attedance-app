const express = require('express');
const router = express.Router();
const TeacherCredentials = require('../models/TeacherCredentials');
const Teacher = require('../models/teacher');

router.get('/details/:teacherId', async (req, res) => {
  try {
    const teacher = await TeacherCredentials.findOne({ teacherId: req.params.teacherId });
    if (teacher) {
      res.json(teacher);
    } else {
      res.status(404).send('Teacher not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//  route handler
// Updated route handler
// Updated route handler
router.patch('/:teacherId/generateOTP', async (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    const { subject, section, otp, latitude, longitude } = req.body;
    console.log(latitude);

    // Find the teacher's credentials by teacherId
    const teacherCredential = await TeacherCredentials.findOne({ teacherId });

    if (!teacherCredential) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Update the existing Teacher document with the new otp and location
    const updatedTeacher = await Teacher.findOneAndUpdate(
      { teacherId },
      {
        name: teacherCredential.name,
        email: teacherCredential.email,
        teacherId,
        subject,
        section,
        otp,
        longitude,
        latitude,
      },
      { new: true, upsert: true }
    );
    console.log(longitude);
    res.status(200).json({ message: 'OTP generated successfully', otp, teacher: updatedTeacher });
  } catch (error) {
    console.error('Error generating OTP:', error);
    res.status(500).json({ message: 'Error generating OTP', error });
  }
});





module.exports = router;
