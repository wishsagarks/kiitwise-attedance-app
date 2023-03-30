import React, { useState } from 'react';
import axios from 'axios';


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
    <div>
      <h1>Hello Teacher</h1>
      <button onClick={generateOTP}>Generate OTP</button>
      {otp && <h2>OTP: {otp}</h2>}
    </div>
  );
};



export default GenerateOTP;
