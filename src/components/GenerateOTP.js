import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GenerateOTP = () => {
  const { teacherId } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [subject, setSubject] = useState('');
  const [section, setSection] = useState('');

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/teachers/${teacherId}`);
        setTeacher(response.data);
      } catch (error) {
        console.error('Error fetching teacher:', error);
      }
    };
    fetchTeacher();
  }, [teacherId]);

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleSectionChange = (e) => {
    setSection(e.target.value);
  };

  const handleGenerateOTP = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const response = await axios.post(`http://localhost:5000/api/teachers/${teacherId}/generateOTP`, {
          subject,
          section,
          latitude,
          longitude,
        });
        alert(`OTP generated: ${response.data.otp}`);
      } catch (error) {
        console.error('Error generating OTP:', error);
      }
    });
  };

  if (!teacher) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Hello, {teacher.name}</h1>
      <h2>Choose subject:</h2>
      <select value={subject} onChange={handleSubjectChange}>
        <option value="">Select subject</option>
        {teacher.subject.map((s, i) => (
          <option key={i} value={s}>
            {s}
          </option>
        ))}
      </select>
      <h2>Choose section:</h2>
      <select value={section} onChange={handleSectionChange}>
        <option value="">Select section</option>
        {teacher.section.map((s, i) => (
          <option key={i} value={s}>
            {s}
          </option>
        ))}
      </select>
      <button onClick={handleGenerateOTP}>Generate OTP</button>
    </div>
  );
};

export default GenerateOTP;
