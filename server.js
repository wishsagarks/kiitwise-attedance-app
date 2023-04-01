const express = require("express");
const cors = require("cors");
const connectDB = require("./database");
const studentRoutes = require("./routes/students");
const teacherLoginRoutes = require("./routes/teacherLogin");
const studentLoginRoutes = require("./routes/studentLogin");
const teacherRouter = require('./routes/teacher.js');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/teachers", teacherRouter);
app.use("/api/students", studentRoutes);
app.use("/api/teacherLogin", teacherLoginRoutes);
app.use("/api/studentLogin", studentLoginRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
