import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TeacherLogin from './components/TeacherLogin';
import GenerateOTP from './components/GenerateOTP';
import StudentLogin from './components/StudentLogin';
import SubmitAttendanceWithBackground from './components/SubmitAttendance';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/teacherLogin" element={<TeacherLogin />} />
          <Route path="/generateOTP/:teacherId" element={<GenerateOTP />} />
          <Route path="/studentLogin" element={<StudentLogin />} />
          <Route path="/submitAttendance/:studentId" element={<SubmitAttendanceWithBackground />} />
          <Route path="*" element={<NotFound></NotFound>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
