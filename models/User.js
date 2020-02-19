const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    minlength: [8, "minimum 8 characters"],
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },
  photo: {
    type: String
  },
  role: {
    type: String
  },
  resetToken: String
});

UserSchema.methods.comparePassword = function(inputPass) {
  return bcrypt.compareSync(inputPass, this.password);
};

UserSchema.pre("save", function(next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 10);
  return next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
