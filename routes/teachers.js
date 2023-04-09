const express = require('express');
const router = express.Router();
const TeacherCredentials = require('../models/TeacherCredentials');
const Teacher = require('../models/teacher');
const Student = require('../models/student');
const Papa = require('papaparse');


router.get('/details/:teacherId', async (req, res) => {
  try {
    const teacher = await TeacherCredentials.findOne({ teacherId: req.params.teacherId });
    if (teacher) {
      res.json(teacher);
    } else {
      res.status(404).send('Teacher not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Updated route handler
router.patch('/:teacherId/generateOTP', async (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    const { subject, section, otp, latitude, longitude } = req.body;

    // Find the teacher's credentials by teacherId
    const teacherCredential = await TeacherCredentials.findOne({ teacherId });

    if (!teacherCredential) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Update the existing Teacher document with the new otp and location
    const updatedTeacher = await Teacher.findOneAndUpdate(
      { teacherId },
      {
        name: teacherCredential.name,
        email: teacherCredential.email,
        teacherId,
        subject,
        section,
        otp,
        longitude,
        latitude,
        otpCreatedAt: new Date(),
      },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: 'OTP generated successfully', otp, teacher: updatedTeacher });
  } catch (error) {
    console.error('Error generating OTP:', error);
    res.status(500).json({ message: 'Error generating OTP', error });
  }
});

// Route handler to export attendance list
router.get('/:teacherId/exportAttendance', async (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    const teacher = await Teacher.findOne({ teacherId });

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const students = await Student.find({
      'subject': teacher.subject,
      'section': teacher.section,
      'otp': teacher.otp,
    });

    const records = students.map((student) => ({
      name: student.name,
      email: student.email,
      studentId: student.studentId,
      attendance: 'P',
    }));

    const csvContent = Papa.unparse(records);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=attendance.csv');
    res.setHeader('X-Filename', `${teacher.subject}-${teacher.section}.csv`);
    res.status(200).send(csvContent);
    
  } catch (error) {
    console.error('Error exporting attendance:', error);
    res.status(500).json({ message: 'Error exporting attendance', error });
  }
});

module.exports = router;

        