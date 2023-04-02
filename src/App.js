import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TeacherLogin from './components/TeacherLogin';
import StudentLogin from './components/StudentLogin';
import GenerateOTP from './components/GenerateOTP';
import SubmitAttendance from './components/SubmitAttendance';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/teacherLogin" element={<TeacherLogin />} />
          <Route path="/studentLogin" element={<StudentLogin />} />
          <Route path="/generateOTP/:teacherId" element={<GenerateOTP />} />
          <Route path="/submitAttendance/:studentId" element={<SubmitAttendance />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
