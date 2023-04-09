import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './styles/TeacherLogin.css'
import Background from './Background';

const SubmitAttendance = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [subject, setSubject] = useState('');
  const [section, setSection] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchStudent = async () => {
      const response = await axios.get(`http://localhost:5000/api/students/details/${studentId}`);
      setStudent(response.data);
    };

    fetchStudent();
  }, [studentId]);

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleSectionChange = (e) => {
    setSection(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmitAttendance = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
  
        try {
          const studentDetailsResponse = await axios.get(`http://localhost:5000/api/students/details/${studentId}`);
          const studentDetails = studentDetailsResponse.data;
          const response = await axios.post(`http://localhost:5000/api/students/${studentId}/submitAttendance`, {
            ...studentDetails,
            studentId,
            subject,
            section,
            otp,
            latitude,
            longitude,
          });
          setMessage(response.data.message);
        } catch (error) {
          if (error.response && error.response.data) {
            setMessage(error.response.data.message);
          } else {
            setMessage("An unexpected error occurred.");
          }
        }
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };
  
  const css_2 = {
    position:'relative',
    left:'35%',
    color:'white'
    }
    const css_3 = {
      position:'relative',
      bottom:'1.5vh',
      color:'white'
      }

  return (
    <Background>
    <div className="teacher-login-wrapper">
        <div className="App">
      {student && <h1 style={{position:'relative',top:'4.5px'}} >Hello, {student.name}</h1>}
      <label className="generate-otp-label">Subject:</label>
      <select style={css_2} className="generate-otp-select" value={subject} onChange={handleSubjectChange}>        
      <option style={{color:'black'}} value="">Select a subject</option>
        {student && student.subject.map((sub, index) => <option style={{color:'black'}} key={index} value={sub}>{sub}</option>)}
      </select>
      <br />
      <label className="generate-otp-label">Section:</label>
      <select style={css_2} className="generate-otp-select" value={section} onChange={handleSectionChange}>        
      <option style={{color:'black'}} value="">Select a section</option>
        {student && student.section.map((sec, index) => <option style={{color:'black'}} key={index} value={sec}>{sec}</option>)}
      </select>
      <br />
      <label>OTP:</label>
      <input type="text" value={otp} onChange={handleOtpChange} />
      <br />
      <button style={{position:'relative',top:'-20.5px'}} onClick={handleSubmitAttendance}>Submit Attendance</button>
      <br />
      {message && <p style={css_3}>{message}</p>}
    </div>
    </div>
    </Background>
  );
};

const SubmitAttendanceWithBackground = (props) => {
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
      <SubmitAttendance {...props} />
    </div>
  );
};

export default SubmitAttendanceWithBackground;
