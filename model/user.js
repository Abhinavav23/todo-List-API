const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const task = require('./task')

//creating user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

//connecting tasks with user
userSchema.virtual('UserTasks', {
    ref: 'tasks',
    localField: '_id',
    foreignField: 'users'
})

//generating autorozation token
userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "ApiSecretKey001");
  user.token = token;
  return token;
};

//defining function to find user by their credentials
userSchema.statics.findByCredentials = async (email, password) => {
  //finding the user in the database
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("No user Found");
  }
  //matching the password

  const pwdValid = await bcrypt.compare(password, user.password);
  if(!pwdValid){
      throw new Error('Password Incorrect')
  }
  return user;
};

//hashing the password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("users", userSchema);

module.exports = User;
