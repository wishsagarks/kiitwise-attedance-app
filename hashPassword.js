const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Teacher = require("./models/TeacherCredentials");
const connectDB = require("./database");

const email = "wish@kiit.com"; // Replace with the teacher's email
const password = "KIIT@2024"; // Replace with the desired password for the teacher
const saltRounds = 10;

connectDB();

bcrypt.hash(password, saltRounds, async function (err, hash) {
  // Store the hashed password in the database
  console.log("Hashed password:", hash);

  // Create the new teacher document
  const newTeacher = new Teacher({
    email,
    password: hash,
  });

  // Save the new teacher document to the database
  try {
    await newTeacher.save();
    console.log("Teacher added to the database");
  } catch (error) {
    console.error("Error adding teacher:", error);
  } finally {
    mongoose.connection.close();
  }
});
