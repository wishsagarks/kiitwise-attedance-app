const express = require("express");
const router = express.Router();
const Teacher = require("../models/TeacherCredentials");
const bcrypt = require("bcrypt");
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      return res.status(400).json({ message: "Email not found" });
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, teacher.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    res.json({ message: "Logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
