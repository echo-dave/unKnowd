const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  password: {
    type: String,
    min: [8, "minimum 8 characters"],
    required: true
  },
  email: {
    type: String,
    required: true
  },
  photo: {
    type: String
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
