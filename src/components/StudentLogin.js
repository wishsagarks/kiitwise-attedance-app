import React, { useState } from 'react';
import axios from 'axios';

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/studentLogin/login', {
        email,
        password,
      });

      if (response.data.message === 'Logged in successfully') {
        // Redirect to the SubmitAttendance page
        window.location.href = '/submitAttendance';
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error in input');
    }
  };

  return (
    <div>
      <h1>Student Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default StudentLogin;
