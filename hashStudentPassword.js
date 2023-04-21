const bcrypt = require('bcrypt');
const StudentCredentials = require('./models/StudentCredentials');
const connectDB = require('./database');

// Connect to the database
connectDB();

// Student details to be added
const students = [
  {
    studentId: 'S101',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    password: 'alicepassword',
    subject: ['Math', 'Physics'],
    section: ['A', 'B'],
  },
  {
    studentId: 'WISH',
    name: 'SAGAR SATAPATHY',
    email: '2005261@kiit.ac.in',
    password: 'KIIT2024',
    subject: ['SPM','Chemistry', 'Biology'],
    section: ['CSE-17', 'C'],
  },
  {
    studentId: 'S103',
    name: 'Shivam Agarwal',
    email: 'shivamagarwal@gmail.com',
    password: '9159',
    subject: ['Math','Chemistry', 'Biology'],
    section: ['A', 'C'],
  },
  {
    studentId: 'S104',
    name: 'ram hari',
    email: 'ram@kiit.com',
    password: 'ram',
    subject: ['Math','Chemistry', 'Biology'],
    section: ['A', 'C'],
  },
];
async function saveStudents() {
  for (const studentData of students) {
    const hashedPassword = await bcrypt.hash(studentData.password, 10);
    const student = new StudentCredentials({
      studentId: studentData.studentId,
      name: studentData.name,
      email: studentData.email,
      password: hashedPassword,
      subject: studentData.subject,
      section: studentData.section,
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

