import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TeacherLogin from './components/TeacherLogin';
import GenerateOTP from './components/GenerateOTP';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/teacherLogin" element={<TeacherLogin />} />
          <Route path="/generateOTP/:teacherId" element={<GenerateOTP />} />
          <Route path="*" element={<NotFound></NotFound>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
