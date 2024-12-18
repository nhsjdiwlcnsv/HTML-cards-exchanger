const userService = require("../services/users");

async function create(req, res) {
  const { username, email, password } = req.body;

  try {
    const userDoc = await userService.create(username, email, password);
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
}

async function read(req, res) {
  const { id } = req.params;
  try {
    const user = await userService.readUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

async function update(req, res) {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedUser = await userService.update(id, updates);
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

async function remove(req, res) {
  const { id } = req.params;

  try {
    const deletedUser = await userService.remove(id);
    if (deletedUser) {
      res.json("User deleted successfully");
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  const userDoc = await userService.readUserByUsername(username);

  if (userDoc) {
    const passOk = userService.validatePassword(password, userDoc.password);
    if (passOk) {
      const token = userService.generateToken({
        username: userDoc.username,
        id: userDoc._id,
      });
      res.cookie("token", token).json(userDoc);
    } else {
      res.status(422).json("password not ok");
    }
  } else {
    res.status(404).json("User not found");
  }
}

async function profile(req, res) {
  const { token } = req.cookies;
  console.log(token + "fr,l;,f;,ld");
  if (token) {
    try {
      const userData = userService.verifyToken(token);
      const { username, _id } = await userService.readUserById(userData.id);
      res.json({ username, _id });
    } catch (err) {
      res.status(401).json("Token is invalid");
    }
  } else {
    res.status(401).json("No token provided");
  }
}

async function logout(req, res) {
  res.cookie("token", "").json(true);
}

module.exports = { create, read, update, remove, login, profile, logout };
