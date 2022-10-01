const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username is already in use"],
  },
  password: String,
  email: {
    type: String,
    validate: [validator.isEmail, "Invalid Email"],
    unique: [true, "Email is already in use"],
  },
  role: {
    type: String,
    enum: ["MANUFACTUER", "CUSTOMER"],
  },
});

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(String(this.password), 10);
  next();
});
UserSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error(`${Object.keys(error.keyValue)[0]} must be unique`));
  } else {
    next(error);
  }
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
