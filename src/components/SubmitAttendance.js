import React, { useState } from 'react';
import axios from 'axios';

const SubmitAttendance = () => {
  const [email, setEmail] = useState('');
  const [OTP, setOTP] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!navigator.geolocation) {
      setMessage('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await axios.post('http://localhost:5000/api/students/submitAttendance', {
            email,
            OTP,
            latitude,
            longitude,
          });

          if (response.data.message === 'Present') {
            
            setMessage('You are Present');
          } else if (response.data.message === 'Absent - away from class') {
            setMessage('Away from class');
          } else {
            setMessage('Invalid OTP');
          }
        } catch (error) {
          console.error('Error:', error);
          setMessage('Error in input');
        }
      },
      (err) => {
        setMessage('Error obtaining location');
      }
    );
  };

  return (
    <div>
      <h1>Submit Attendance</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label>OTP:</label>
        <input
          type="text"
          value={OTP}
          onChange={(e) => setOTP(e.target.value)}
          required
        />
        <br />
        <button type="submit">Submit Attendance</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SubmitAttendance;
