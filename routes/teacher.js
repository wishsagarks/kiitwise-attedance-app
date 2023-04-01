const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');

router.post('/generateOTP', async (req, res) => {
  const { teacherId, otp, latitude, longitude } = req.body;

  try {
    const teacher = await Teacher.findOne({ teacherId });

    if (!teacher) {
      return res.status(400).json({ message: 'Teacher not found' });
    }

    teacher.otp = otp;
    teacher.latitude = latitude;
    teacher.longitude = longitude;

    await teacher.save();

    res.status(200).json({ message: 'OTP and location saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
