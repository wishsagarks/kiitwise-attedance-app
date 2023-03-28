const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher');
const Student = require('../models/student');

router.post('/submitAttendance', async (req, res) => {
  const { roll_no, OTP, latitude, longitude } = req.body;

  try {
    const teacher = await Teacher.findOne({ OTP });

    if (!teacher) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Set the distance threshold (e.g., 0.01 for 10 meters)
    const distanceThreshold = 0.01;

    if (
      Math.abs(teacher.latitude - latitude) <= distanceThreshold &&
      Math.abs(teacher.longitude - longitude) <= distanceThreshold
    ) {
      const newStudent = new Student({ roll_no, Attendance: 'Present', OTP });
      await newStudent.save();
      res.status(201).json({ message: 'Attendance submitted successfully' });
    } else {
      res.status(400).json({ message: 'Location mismatch. Attendance not submitted' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error submitting attendance', error });
  }
});

module.exports = router;
