const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;

async function create(username, email, password) {
  const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

  const existingUsername = await User.findOne({ email });
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new Error("User with this email already exists");
  }

  if (existingUsername) {
    throw new Error("User with the same username exists");
  }

  return await User.create({ username, email, password: hashedPassword });
}

async function readUserByUsername(username) {
  return await User.findOne({ username });
}

async function readUserByEmail(email) {
  return await User.findOne({ email });
}

async function readUserById(id) {
  return await User.findById(id);
}

async function update(id, updates) {
  if (updates.email) {
    const existingEmail = await User.findOne({ email: updates.email });
    if (existingEmail && existingEmail._id.toString() !== id) {
      throw new Error("Email is already in use by another user");
    }
  }

  if (updates.username) {
    const existingUsername = await User.findOne({ username: updates.username });
    if (existingUsername && existingUsername._id.toString() !== id) {
      throw new Error("Username is already in use by another user");
    }
  }

  if (updates.password) {
    updates.password = bcrypt.hashSync(updates.password, bcryptSalt);
  }
  return await User.findByIdAndUpdate(id, updates, { new: true });
}

async function remove(id) {
  return await User.findByIdAndDelete(id);
}

function validatePassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

function generateToken(payload) {
  return jwt.sign(payload, jwtSecret, {});
}

function verifyToken(token) {
  return jwt.verify(token, jwtSecret);
}

module.exports = {
  create,
  readUserByUsername,
  readUserById,
  update,
  remove,
  validatePassword,
  generateToken,
  verifyToken,
};
