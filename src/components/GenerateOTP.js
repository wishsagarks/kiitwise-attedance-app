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

const GenerateOTP = () => {
  const [otp, setOtp] = useState(null);

  const generateOTP = async () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000);
    setOtp(newOtp);

    
    if ("geolocation" in navigator) {
 
      console.log("location connected");
    } else {
      console.log("location Not Available");
    }

 
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

       
        const teacherData = {
          OTP: newOtp,
          latitude: lat,
          longitude: lon,
        };

        // Replace with backend API endpoint
        await axios.post('http://localhost:5000/api/teachers/generateOTP', teacherData);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  return (
    // <div>
    //   <h1>Hello Teacher</h1>
    //   <button onClick={generateOTP}>Generate OTP</button>
    //   {otp && <h2>OTP: {otp}</h2>}
    // </div>
    <>
     <MDBContainer fluid>
      <MDBRow>

        <MDBCol sm='6'>

          <div className='d-flex flex-row ps-5 pt-5'>
            <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }}/>
            <span className="h1 fw-bold mb-0">Kiitwise Attendance</span>
          </div>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4 MarginChange'>

        
            <MDBBtn onClick={generateOTP} className="mb-4 px-5 mx-5 w-100" color='info' size='lg'>Generate OTP</MDBBtn>
            {otp && <h2 style={{position:'relative',left:'44%'}}>OTP: {otp}</h2>}

          </div>

        </MDBCol>

        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
            alt="Login image" className="w-100" style={{objectFit: 'cover', objectPosition: 'left'}} />
        </MDBCol>

      </MDBRow>

    </MDBContainer>
    </>
  );
};



export default GenerateOTP;
