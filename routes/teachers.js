const express = require('express');
const router = express.Router();
const TeacherCredentials = require('../models/TeacherCredentials');
const Teacher = require('../models/teacher');
const Student = require('../models/student');
const Papa = require('papaparse');
const Attendance = require('../models/Attendance');



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
    const { subject, section, latitude, longitude } = req.body;

    // Find the teacher's credentials by teacherId
    const teacherCredential = await TeacherCredentials.findOne({ teacherId });

    if (!teacherCredential) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Update the existing Teacher document with the new location
    const updatedTeacher = await Teacher.findOneAndUpdate(
      { teacherId },
      {
        name: teacherCredential.name,
        email: teacherCredential.email,
        teacherId,
        subject,
        section,
        longitude,
        latitude,
        locationUpdatedAt: new Date(),
      },
      { new: true, upsert: true }
    );
console.log(longitude);
console.log(latitude);
    res.status(200).json({ message: 'Location saved successfully', teacher: updatedTeacher });
  } catch (error) {
    console.error('Error saving location:', error);
    res.status(500).json({ message: 'Error saving location', error });
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

    const studentsInSection = await Student.find({ 'subject': teacher.subject, 'section': teacher.section });
    const presentStudents = studentsInSection.filter(student => student.attendance);

    const allStudents = await Student.find({});
    const absentStudents = allStudents.filter(student => !presentStudents.includes(student));

    const records = studentsInSection.map((student) => ({
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

        