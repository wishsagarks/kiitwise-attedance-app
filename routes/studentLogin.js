const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const StudentCredentials = require('../models/StudentCredentials');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the student by their email
    const student = await StudentCredentials.findOne({ email });

    if (!student) {
      return res.status(400).json({ message: 'Invalid email ' });
    }

    // Check if the provided password matches the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, student.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // If the email and password are valid, send the student details as a response
    res.status(200).json({
      message: 'Login successful',
      studentId: student.studentId,
    });
  } catch (error) {
    console.error('Error during student login:', error);
    res.status(500).json({ message: 'Error during student login', error });
  }
});

module.exports = router;
