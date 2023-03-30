const express = require("express");
const router = express.Router();
const StudentLogin = require("../models/studentLogin");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { roll_no, password } = req.body;
  const newStudent = new StudentLogin({ roll_no, password });

  try {
    await newStudent.save();
    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering student", error });
  }
});

router.post("/login", async (req, res) => {
  const { roll_no, password } = req.body;

  try {
    const student = await StudentLogin.findOne({ roll_no });
    if (!student) {
      return res.status(400).json({ message: "Invalid roll number or password" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid roll number or password" });
    }

    res.status(200).json({ message: "Student logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

module.exports = router;
