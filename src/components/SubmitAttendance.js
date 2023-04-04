import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './styles/SubmitAttendance.css'

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

      color:'white'
      }
  return (
    <div className="student-login-wrapper">
    <div className='App'>
      {student && <h1>Hello, {student.name}</h1>}
      <label>Subject:</label>
      <select style={css_2} value={subject} onChange={handleSubjectChange}>
        <option value="">Select a subject</option>
        {student && student.subject.map((sub, index) => <option key={index} value={sub}>{sub}</option>)}
      </select>
      <br />
      <label>Section:</label>
      <select style={css_2} value={section} onChange={handleSectionChange}>
        <option value="">Select a section</option>
        {student && student.section.map((sec, index) => <option key={index} value={sec}>{sec}</option>)}
      </select>
      <br />
      <label>OTP:</label>
      <input type="text" value={otp} onChange={handleOtpChange} />
      <br />
      <button onClick={handleSubmitAttendance}>Submit Attendance</button>
      <br />
      {message && <p style={css_3}>{message}</p>}
    </div>
    </div>
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
