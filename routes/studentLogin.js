const express = require("express");
const router = express.Router();
const Student = require("../models/StudentCredentials");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("Received login request:", req.body);

  try {
    const student = await Student.findOne({ email });

    if (!student) {
      console.log("Email not found");
      return res.status(400).json({ message: "Email not found" });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      console.log("Wrong password");
      return res.status(400).json({ message: "Wrong password" });
    }

    res.json({ message: "Logged in successfully" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
