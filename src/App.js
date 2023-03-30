import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GenerateOTP from './components/GenerateOTP';
import SubmitAttendance from './components/SubmitAttendance';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/generateOTP" element={<GenerateOTP></GenerateOTP>} />
        <Route path="/" component={<SubmitAttendance></SubmitAttendance>} />
      </Routes>
    </Router>
  );
}

export default App;
