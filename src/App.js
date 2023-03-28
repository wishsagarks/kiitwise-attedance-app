import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GenerateOTP from './components/GenerateOTP';
import SubmitAttendance from './components/SubmitAttendance';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/generateOTP" component={GenerateOTP} />
        <Route path="/submitAttendance" component={SubmitAttendance} />
      </Switch>
    </Router>
  );
}

export default App;
