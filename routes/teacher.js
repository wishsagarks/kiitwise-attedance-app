const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');
router.get("/:teacherId", async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.teacherId);
    if (teacher) {
      res.json(teacher);
    } else {
      res.status(404).json({ message: "Teacher not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching teacher data" });
  }
});

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
