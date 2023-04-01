const express = require("express");
const router = express.Router();
const Teacher = require("../models/TeacherCredentials");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  const { email, password,} = req.body;

  console.log("Received login request:", req.body); // Log the received data

  try {
    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      console.log("Email not found"); // Log when the email is not found
      return res.status(400).json({ message: "Email not found" });
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, teacher.password);

    if (!isMatch) {
      console.log("Wrong password"); // Log when the password is incorrect
      return res.status(400).json({ message: "Wrong password" });
    }

    res.json({ message: "Logged in successfully" });
  } catch (error) {
    console.error("Error during login:", error); // Log any error that occurs during processing
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
