const express = require('express');
const router = express.Router();
const StudentCredentials = require('../models/StudentCredentials');
const Student = require('../models/student');
const Teacher = require('../models/teacher');

router.get('/details/:studentId', async (req, res) => {
  try {
    const student = await StudentCredentials.findOne({ studentId: req.params.studentId });
    if (student) {
      res.json(student);
    } else {
      res.status(404).send('Student not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Updated route handler for submitting attendance
router.post('/:studentId/submitAttendance', async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const { subject, section, otp, latitude, longitude } = req.body;

    // Find the student's credentials by studentId
    const studentCredential = await StudentCredentials.findOne({ studentId });

    if (!studentCredential) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Find the teacher by subject, section and otp
    const teacher = await Teacher.findOne({ subject, section, otp });

    if (!teacher) {
      return res.status(404).json({ message: 'Invalid OTP' });
    }

    // Check if the student is within 5 centimeters of the teacher
    const distance = getDistance(latitude, longitude, teacher.latitude, teacher.longitude);
    if (distance > 0.05) {
      return res.status(400).json({ message: 'You are too far from the teacher. Attendance not submitted.' });
    }

    // Save attendance details in the student model
    const updatedStudent = await Student.findOneAndUpdate(
      { studentId },
      {
        name: studentCredential.name,
        email: studentCredential.email,
        studentId,
        subject,
        section,
        otp,
        longitude,
        latitude,
        attendance: true,
      },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: 'Attendance submitted successfully', student: updatedStudent });
  } catch (error) {
    console.error('Error submitting attendance:', error);
    res.status(500).json({ message: 'Error submitting attendance', error });
  }
});

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth radius in meters
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  return d;
}

function toRad(value) {
  return (value * Math.PI) / 180;
}

module.exports = router;
