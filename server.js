const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

connectDB();

// Add API routes
app.use('/api/teachers', require('./routes/teachers'));
app.use('/api/students', require('./routes/students'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
