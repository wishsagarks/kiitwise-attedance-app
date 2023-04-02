const express = require('express');
const router = express.Router();
const StudentCredentials = require('../models/StudentCredentials');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await StudentCredentials.findOne({ email });

    if (!student) {
      return res.status(400).json({ message: 'Email not found' });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    console.log(student.studentId);
    res.status(200).json({ message: 'Logged in successfully', studentId: student.studentId });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
