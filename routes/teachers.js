const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher');

router.post("/generateOTP", async (req, res) => {
  const { OTP, latitude, longitude } = req.body;

  console.log("Received OTP and location data:", req.body); // Log the received data

  try {
    const newTeacher = new Teacher({
      OTP,
      latitude,
      longitude,
    });

    await newTeacher.save();
    console.log("OTP and location data saved to the database"); // Log the successful save
    res.json({ message: "OTP generated" });
  } catch (error) {
    console.error("Error during OTP generation:", error); // Log any error that occurs during processing
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
