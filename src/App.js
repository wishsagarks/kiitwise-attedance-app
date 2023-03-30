import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GenerateOTP from "./components/GenerateOTP";
import SubmitAttendance from "./components/SubmitAttendance";
import TeacherLogin from "./components/TeacherLogin";
import StudentLogin from "./components/StudentLogin";

function App() {
  return (
    <Router>

      <div>
        <Routes>
          <Route path="/teacher-login" element={<TeacherLogin></TeacherLogin>} />
          <Route path="/student-login" element={<StudentLogin></StudentLogin>} />
          <Route path="/generateOTP" element={<GenerateOTP></GenerateOTP>} />
        <Route path="/submitAttendance" element={<SubmitAttendance></SubmitAttendance>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
