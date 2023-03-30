import React, { useState } from 'react';
import axios from 'axios';

const SubmitAttendance = () => {
  const [otp, setOtp] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const studentData = {
          roll_no: rollNumber,
          OTP: otp,
          latitude: lat,
          longitude: lon,
        };

        // Replace with  backend API endpoint
        const response = await axios.post('http://localhost:5000/api/students/submitAttendance',studentData);

        setMessage(response.data.message);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  return (
    <div>
      <h1>Submit Attendance</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="rollNumber">Roll Number:</label>
        <input
          type="text"
          id="rollNumber"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />
        <br />
        <label htmlFor="otp">OTP:</label>
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {message && <h3>{message}</h3>}
    </div>
  );
};

export default SubmitAttendance;
