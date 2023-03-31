const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher');
const Student = require('../models/student');

router.post('/submitAttendance', async (req, res) => {
  const { OTP, latitude, longitude, id, roll_no } = req.body;

  try {
    // the teacher with the provided OTP
    const teacher = await Teacher.findOne({ OTP });

    if (!teacher) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Calculate the distance between the teacher and the student
    const distance = getDistance(
      { latitude: teacher.latitude, longitude: teacher.longitude },
      { latitude, longitude }
    );

    //  if the student is within 5 meters of the teacher
    if (distance <= 1) {
      // Marked the student as present
      const attendanceStatus = 'Present';
      // Saved attendance data in the database
      const newStudent = new Student({
        id,
        roll_no,
        Attendance: attendanceStatus,
        OTP,
        longitude,
        latitude
      });

      await newStudent.save();
      // console log message
  console.log(`Attendance successful: ${attendanceStatus}, OTP: ${OTP}, Latitude: ${latitude},Longitude: ${longitude}`);
      res.json({ message: 'Present' });
    } else {
      res.json({ message: 'Absent - away from class' });
    }
  } catch (error) {
    console.error('Error during attendance submission:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper function 
function getDistance(coord1, coord2) {
  const R = 6371e3; 
  const lat1 = (coord1.latitude * Math.PI) / 180;
  const lat2 = (coord2.latitude * Math.PI) / 180;
  const deltaLat = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
  const deltaLng = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

module.exports = router;
