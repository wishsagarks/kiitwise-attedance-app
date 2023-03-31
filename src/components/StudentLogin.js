import React, { useState } from "react";
import axios from "axios";
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

const StudentLogin = () => {
  const [roll_no, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/studentLogin/login", { roll_no, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error logging in");
    }
  };

  return (
    <>
      {/* <h1>Student Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Roll Number:</label>
        <input type="text"/>
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>} */}
  <MDBContainer fluid>
      <MDBRow>

        <MDBCol sm='6'>

          <div className='d-flex flex-row ps-5 pt-5'>
            <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }}/>
            <span className="h1 fw-bold mb-0">Kiitwise Attendance</span>
          </div>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4 MarginChange'>

            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}> Student Login</h3>
            <form onSubmit={handleSubmit}>
            <MDBInput wrapperClass='mb-4 mx-5 w-100' value={roll_no} onChange={(e) => setRollNo(e.target.value)} label='Roll No' id='formControlLg' type='number' size="lg"/>
            <MDBInput wrapperClass='mb-4 mx-5 w-100' value={password} onChange={(e) => setPassword(e.target.value)} label='Password' id='formControlLg' type='password' size="lg"/>

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

      </>    
  );
};

export default StudentLogin;
