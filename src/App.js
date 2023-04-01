// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GenerateOTP from "./components/GenerateOTP";
import SubmitAttendance from "./components/SubmitAttendance";
import TeacherLogin from "./components/TeacherLogin";
import StudentLogin from './components/StudentLogin';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/teacherLogin" element={<TeacherLogin />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/generateOTP/:teacherId" element={<GenerateOTP />} />
          <Route path="/submitAttendance" element={<SubmitAttendance />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
