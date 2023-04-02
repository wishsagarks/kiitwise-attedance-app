import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

        const studentDetailsResponse = await axios.get(`http://localhost:5000/api/students/details/${studentId}`);
        const studentDetails = studentDetailsResponse.data;         
        console.log(studentDetails); 
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
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      {student && <h1>Hello, {student.name}</h1>}
      <label>Subject:</label>
      <select value={subject} onChange={handleSubjectChange}>
        <option value="">Select a subject</option>
        {student && student.subject.map((sub, index) => <option key={index} value={sub}>{sub}</option>)}
      </select>
      <br />
      <label>Section:</label>
      <select value={section} onChange={handleSectionChange}>
        <option value="">Select a section</option>
        {student && student.section.map((sec, index) => <option key={index} value={sec}>{sec}</option>)}
      </select>
      <br />
      <label>OTP:</label>
      <input type="text" value={otp} onChange={handleOtpChange} />
      <br />
      <button onClick={handleSubmitAttendance}>Submit Attendance</button>
      <br />
      {message && <p>{message}</p>}
    </div>
  );
};

export default SubmitAttendance;
