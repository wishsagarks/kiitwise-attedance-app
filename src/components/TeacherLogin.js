
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const TeacherLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/teacherLogin/login", { email, password });
      setMessage(response.data.message);
      navigate.push("/generate-otp");
    } catch (error) {
      setMessage("Error logging in");
    }
  };

  return (
    <div>
      <h1>Teacher Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default TeacherLogin;
