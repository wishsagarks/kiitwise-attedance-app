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

        // eslint-disable-next-line
        const response = await axios.get('https://ip-geo-location-and-ip-reputation.p.rapidapi.com/', {
          headers: {
            'X-RapidAPI-Key': '98f139625emsh4c9f7b4f0e29f81p1553dcjsndbb273a68cba',
            'X-RapidAPI-Host': 'ip-geo-location-and-ip-reputation.p.rapidapi.com',
          },
        });

        const teacherData = {
          OTP: newOtp,
          latitude: lat,
          longitude: lon,
        };

        // Replace with your backend API endpoint
        await axios.post('/api/teachers', teacherData);
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
