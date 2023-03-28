const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher');

router.post('/', async (req, res) => {
  const { OTP, latitude, longitude } = req.body;
  const newTeacher = new Teacher({ OTP, latitude, longitude });

  try {
    await newTeacher.save();
    res.status(201).json({ message: 'OTP generated and location saved' });
  } catch (error) {
    res.status(500).json({ message: 'Error generating OTP and saving location', error });
  }
});

module.exports = router;
