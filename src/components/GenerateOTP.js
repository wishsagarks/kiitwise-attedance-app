import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './styles/TeacherLogin.css'
import Background from './Background';



const GenerateOTP = () => {
  const { teacherId } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [subject, setSubject] = useState('');
  const [section, setSection] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTeacher = async () => {
      const response = await axios.get(`http://localhost:5000/api/teachers/details/${teacherId}`);
      setTeacher(response.data);
    };

    fetchTeacher();
  }, [teacherId]);

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleSectionChange = (e) => {
    setSection(e.target.value);
  };

  const handleGenerateOtp = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const teacherDetailsResponse = await axios.get(`http://localhost:5000/api/teachers/details/${teacherId}`);
        const teacherDetails = teacherDetailsResponse.data;

        const response = await axios.patch(`http://localhost:5000/api/teachers/${teacherId}/generateOTP`, {
          ...teacherDetails,
          subject,
          section,
          otp: Math.floor(100000 + Math.random() * 900000).toString(),
          latitude,
          longitude,
        });
        setOtp(response.data.otp);
        setMessage(response.data.message);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleExportAttendance = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/teachers/${teacherId}/exportAttendance`, {
        responseType: 'blob',
      });
  
      // Read the custom header
      const filename = response.headers['x-filename'] || 'attendance.csv';
  
      // Create a link element and trigger a click event to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };
  
  
  
  
  

  //New css by me
const css_1 = {
position:'relative',
left:'35%',
color:'white'
}

const css_2 = {
position:'relative',
left:'35%',
color:'white'
}
  

  return (
    <Background>
      <div className="teacher-login-wrapper">
        <div className="App">
        {teacher && <h1 style={{position:'relative',top:'7.5px'}}>Hello, {teacher.name}</h1>}
        <label>Subject:</label>
        <select style={css_1} value={subject} onChange={handleSubjectChange}>
          <option style={{color:'black'}} value="">Select a subject</option>
          {teacher && teacher.subject.map((sub) => <option style={{color:'black'}} key={sub} value={sub}>{sub}</option>)}
        </select>
        <br />
        <label>Section:</label>
        <select style={css_2} value={section} onChange={handleSectionChange}>
          <option style={{color:'black'}} value="">Select a section</option>
          {teacher && teacher.section.map((sec) => <option style={{color:'black'}} key={sec} value={sec}>{sec}</option>)}
        </select>
        <br />
        <button style={{position:'relative',top:'-24.5px'}} onClick={handleGenerateOtp}>Generate OTP</button>
        {otp && <p style={{color:'white'}}>Your OTP is: {otp}</p>}
        {message && <p style={{color:'white'}}>{message}</p>}
        <br/>
        <button style={{position:'relative',top:'-40.5px'}} onClick={handleExportAttendance}>Export Attendance</button>
      </div>
      </div>
    </Background>
  );
};

export default GenerateOTP;
