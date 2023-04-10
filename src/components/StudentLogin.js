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

    //New css by me
const css_1 = {
  color:'white'
  }
 

  return (
    <div className="student-login-wrapper">
    <div className='App'>
      <h1>Student Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <i className="zmdi zmdi-account zmdi-hc-lg"></i>
        </div>
        <div className="input-container">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <i className="zmdi zmdi-lock zmdi-hc-lg"></i>
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p style={css_1}>{message}</p>}
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
