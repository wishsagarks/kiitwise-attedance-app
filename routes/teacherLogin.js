const express = require("express");
const router = express.Router();
const TeacherLogin = require("../models/teacherLogin");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const newTeacher = new TeacherLogin({ email, password });

  try {
    await newTeacher.save();
    res.status(201).json({ message: "Teacher registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering teacher", error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const teacher = await TeacherLogin.findOne({ email });
    if (!teacher) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Teacher logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

module.exports = router;
