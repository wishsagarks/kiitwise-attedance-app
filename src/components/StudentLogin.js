import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/StudentLogin.css';

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/studentLogin/login', {
        email,
        password,
      });

      if (response.data.message === 'Logged in successfully') {
        navigate(`/submitAttendance/${response.data.studentId}`);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error in input');
    }
  };

  return (
    <div className="student-login-wrapper">
      
    <div className='App'>
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
    </div>
  );
};
const StudentLoginWithBackground = (props) => {
  const backgroundStyle = {
    fontFamily: 'Dosis, sans-serif',
    backgroundImage: 'linear-gradient(140deg, rgb(219, 98, 65) 0%, rgb(229, 91, 141) 100%)',
    height: '100vh',
    width:'100vw',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={backgroundStyle}>
      <StudentLogin {...props} />
    </div>
  );
};

export default StudentLoginWithBackground;
