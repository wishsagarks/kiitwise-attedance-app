import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/TeacherLogin.css';

const TeacherLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.WORKINGPORT}/api/teacherLogin/login`, {
        email,
        password,
      });

      if (response.data.message === 'Logged in successfully') {
        navigate(`/generateOTP/${response.data.teacherId}`);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error in input');
    }
  };

  return (
    <div className="teacher-login-wrapper">
      <div className="App">
        <h1>Teacher Login</h1>
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
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};
const TeacherLoginWithBackground = (props) => {
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
      <TeacherLogin {...props} />
    </div>
  );
};

export default TeacherLoginWithBackground;
