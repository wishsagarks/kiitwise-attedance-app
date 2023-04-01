import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GenerateOTP = () => {
  const { teacherId } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [subject, setSubject] = useState('');
  const [section, setSection] = useState('');
  const [otp, setOtp] = useState('');

  useEffect(() => {
    const fetchTeacher = async () => {
      const response = await axios.get(`http://localhost:5000/api/teachers/${teacherId}`);
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
        const response = await axios.patch(`http://localhost:5000/api/teachers/${teacherId}/generateOTP`, {
          subject,
          section,
          otp: Math.floor(100000 + Math.random() * 900000).toString(),
          latitude,
          longitude,
        });
        setOtp(response.data.otp);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      {teacher && <h1>Hello, {teacher.name}</h1>}
      <label>Subject:</label>
      <select value={subject} onChange={handleSubjectChange}>
        <option value="">Select a subject</option>
        {teacher && teacher.subject.map((sub) => <option key={sub} value={sub}>{sub}</option>)}
      </select>
      <br />
      <label>Section:</label>
      <select value={section} onChange={handleSectionChange}>
        <option value="">Select a section</option>
        {teacher && teacher.section.map((sec) => <option key={sec} value={sec}>{sec}</option>)}
      </select>
      <br />
      <button onClick={handleGenerateOtp}>Generate OTP</button>
      {otp && <p>Your OTP is: {otp}</p>}
    </div>
  );
};

export default GenerateOTP;
