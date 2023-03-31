import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles/login.css'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';


const SubmitAttendance = () => {
  const [otp, setOtp] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const studentData = {
          roll_no: rollNumber,
          OTP: otp,
          latitude: lat,
          longitude: lon,
        };

        // Replace with  backend API endpoint
        const response = await axios.post('http://localhost:5000/api/students/submitAttendance',studentData);

        setMessage(response.data.message);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  return (
    <div>
      {/* <h1>Submit Attendance</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="rollNumber">Roll Number:</label>
        <input
          type="text"
          id="rollNumber"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />
        <br />
        <label htmlFor="otp">OTP:</label>
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {message && <h3>{message}</h3>} */}
       <MDBContainer fluid>
      <MDBRow>

        <MDBCol sm='6'>

          <div className='d-flex flex-row ps-5 pt-5'>
            <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }}/>
            <span className="h1 fw-bold mb-0">Kiitwise Attendance</span>
          </div>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4 MarginChange'>

            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>Log in</h3>
            <form onSubmit={handleSubmit}>
            <MDBInput type="text"
          id="rollNumber"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)} wrapperClass='mb-4 mx-5 w-100' label='Email address' id='formControlLg' size="lg"/>
            <MDBInput type="text"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)} wrapperClass='mb-4 mx-5 w-100' label='Password' id='formControlLg' size="lg"/>

            <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg'>Login</MDBBtn>
            </form>
            {message && <p style={{position:'relative',left:'49.6%'}}>{message}</p>}
            <p className="small mb-5 pb-lg-3 ms-5"><a class="text-muted" href="#!">Forgot password?</a></p>
            <p className='ms-5'>Don't have an account? <a href="#!" class="link-info">Register here</a></p>

          </div>

        </MDBCol>

        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
            alt="Login image" className="w-100" style={{objectFit: 'cover', objectPosition: 'left'}} />
        </MDBCol>

      </MDBRow>

    </MDBContainer>
    </div>
  );
};

export default SubmitAttendance;
