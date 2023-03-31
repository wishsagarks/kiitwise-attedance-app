const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Teacher = require("./models/TeacherCredentials");
const Student = require("./models/StudentCredentials"); // Import the Student model
const connectDB = require("./database");

const email = "wish@kiit.com";
const password = "KIIT@2024";
const saltRounds = 10;

const studentEmail = "root@kiit.com";
const studentPassword = "admin";

connectDB();

async function storeUserCredentials(model, userEmail, userPassword) {
  try {
    const hash = await bcrypt.hash(userPassword, saltRounds);
    console.log("Hashed password:", hash);

    const newUser = new model({
      email: userEmail,
      password: hash,
    });

    await newUser.save();
    console.log("User added to the database");
  } catch (error) {
    console.error("Error adding user:", error);
  }
}

(async function () {
  try {
    await storeUserCredentials(Teacher, email, password);
    await storeUserCredentials(Student, studentEmail, studentPassword);
  } finally {
    mongoose.connection.close();
  }
})();
