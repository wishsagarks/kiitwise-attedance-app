const bcrypt = require('bcrypt');
const TeacherCredentials = require('./models/TeacherCredentials');
const connectDB = require('./database');

// Connect to the database
connectDB();

// Teacher details to be added
const teachers = [
  {
    teacherId: 'T101',
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'johnpassword',
    subject: ['Math', 'Physics'],
    section: ['A', 'B'],
  },
  {
    teacherId: 'T102',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    password: 'janepassword',
    subject: ['Chemistry', 'Biology'],
    section: ['A', 'C'],
  },
];

async function saveTeachers() {
  for (const teacherData of teachers) {
    const hashedPassword = await bcrypt.hash(teacherData.password, 10);
    const teacher = new TeacherCredentials({
      teacherId: teacherData.teacherId,
      name: teacherData.name,
      email: teacherData.email,
      password: hashedPassword,
      subject: teacherData.subject,
      section: teacherData.section,
    });

    try {
      await teacher.save();
      console.log(`Teacher ${teacherData.name} saved successfully.`);
    } catch (error) {
      console.error(`Error saving teacher ${teacherData.name}:`, error);
    }
  }
}

saveTeachers();
