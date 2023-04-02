const express = require('express');
const router = express.Router();
const TeacherCredentials = require('../models/TeacherCredentials');
const Teacher = require('../models/teacher');


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




router.patch('/teachers/:id/generateOTP', async (req, res) => {
  const teacherId = req.params.id;
  const { subject, section, otp, latitude, longitude } = req.body;

  try {
    const teacher = await Teacher.findById(teacherId);

    if (subject) teacher.subject = subject;
    if (section) teacher.section = section;
    if (otp) teacher.otp = otp;
    if (latitude) teacher.latitude = latitude;
    if (longitude) teacher.longitude = longitude;

    const updatedTeacher = await teacher.save();

    res.status(200).json({ status: 'success', data: updatedTeacher });
  } catch (err) {
    console.warn(`Error updating teacher data: ${err}`);
    res.status(500).json({ status: 'error', message: 'Error updating teacher data' });
  }
});





module.exports = router;
