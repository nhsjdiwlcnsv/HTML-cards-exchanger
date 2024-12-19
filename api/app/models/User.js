const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Invalid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  avatar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "avatars.files",
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
