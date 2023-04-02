const bcrypt = require('bcrypt');
const StudentCredentials = require('./models/StudentCredentials');
const connectDB = require('./database');

// Connect to the database
connectDB();

// Student details to be added
const students = [
  {
    name: 'Student 1',
    email: 'student1@example.com',
    password: 'password123',
    subject: ['Math', 'Physics'],
    section: ['A', 'B'],
    teacherId: null,
  },
  {
    name: 'Student 2',
    email: 'student2@example.com',
    password: 'password123',
    subject: ['Chemistry', 'Biology'],
    section: ['A', 'C'],
    teacherId: null,
  },
];

async function saveStudents() {
  for (const studentData of students) {
    const hashedPassword = await bcrypt.hash(studentData.password, 10);
    const student = new StudentCredentials({
      name: studentData.name,
      email: studentData.email,
      password: hashedPassword,
      subject: studentData.subject,
      section: studentData.section,
      teacherId: studentData.teacherId,
    });

    try {
      await student.save();
      console.log(`Student ${studentData.name} saved successfully.`);
    } catch (error) {
      console.error(`Error saving student ${studentData.name}:`, error);
    }
  }
}

saveStudents();
