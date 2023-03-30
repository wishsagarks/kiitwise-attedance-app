
import React, { useState } from "react";
import axios from "axios";

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
    <div>
      <h1>Student Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Roll Number:</label>
        <input type="text" value={roll_no} onChange={(e) => setRollNo(e.target.value)} />
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

export default StudentLogin;
