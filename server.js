const express = require("express");
const cors = require("cors");
const connectDB = require("./database");
const teacherRouter = require('./routes/teachers');
const teacherLoginRoutes = require('./routes/teacherLogin');
const studentLoginRoute = require('./routes/studentLogin');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/teachers", teacherRouter);
app.use("/api/teacherLogin", teacherLoginRoutes);
app.use('/api/studentLogin', studentLoginRoute);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
