const bcrypt = require('bcrypt');
const TeacherCredentials = require('./models/TeacherCredentials');
const connectDB = require('./database');

// Connect to the database
connectDB();

// Teacher details to be added
const teachers = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    teacherId: 'T101',
    password: 'johnpassword',
    subject: ['Math', 'Physics'],
    section: ['A', 'B'],
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    teacherId: 'T102',
    password: 'janepassword',
    subject: ['Chemistry', 'Biology'],
    section: ['A', 'C'],
  },
];

async function saveTeachers() {
  for (const teacherData of teachers) {
    const hashedPassword = await bcrypt.hash(teacherData.password, 10);
    const teacher = new TeacherCredentials({
      name: teacherData.name,
      email: teacherData.email,
      teacherId: teacherData.teacherId,
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
connectDB.close();
