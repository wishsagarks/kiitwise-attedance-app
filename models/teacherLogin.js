const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const TeacherLoginSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

TeacherLoginSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("TeacherLogin", TeacherLoginSchema);