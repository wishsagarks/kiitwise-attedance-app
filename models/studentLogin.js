const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const StudentLoginSchema = new mongoose.Schema({
  roll_no: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

StudentLoginSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("StudentLogin", StudentLoginSchema);
