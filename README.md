# KIITwise: Smart attendance management for KIIT, powered by SAP

Project Name
This is a Node.js project using Express and MongoDB.

Description
This project is a simple web application that allows teachers to generate OTPs for attendance taking. The application uses the RapidAPI IP Geolocation and IP Reputation API to get the current location of the teacher when the OTP is generated. The OTP is then sent to the teacher, who can share it with their students to confirm attendance.

The project is built with Node.js and Express, and it uses MongoDB to store data about the OTPs and the location of the teacher.

Installation
To install the project, follow these steps:

Clone the repository to your local machine:

bash
Copy code
git clone https://github.com/your-username/project-name.git
Navigate to the project directory:

bash
Copy code
cd project-name
Install the dependencies:

Copy code
npm install
Start the server:

sql
Copy code
npm start
Open a web browser and go to http://localhost:3000.

Usage
To use the application, follow these steps:

Go to the home page at http://localhost:3000.
Click the "Generate OTP" button to generate a new OTP.
Share the OTP with your students to confirm attendance.
When the OTP is used, the attendance will be recorded in the database.
Contributing
If you would like to contribute to the project, please follow these steps:

Fork the repository.
Create a new branch with your changes:
css
Copy code
git checkout -b my-feature-branch
Make your changes and commit them:
sql
Copy code
git commit -am 'Added some feature'
Push the branch to your forked repository:
perl
Copy code
git push origin my-feature-branch
Create a pull request to the main repository.
License
This project is licensed under the MIT License. See the LICENSE file for details.
49.37.114.189/32