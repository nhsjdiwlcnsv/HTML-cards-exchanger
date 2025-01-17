const userService = require("../services/users");

async function create(req, res) {
  const data = req.body;

  try {
    if (req.file) {
      data.avatar = req.file.id;
    }
    const userDoc = await userService.create(data);
    res.json(userDoc);
  } catch (e) {
    res.status(409).json(e.message);
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
  } catch (e) {
    res.status(500).json(e.message);
  }
}

async function update(req, res) {
  const { id } = req.params;
  const updates = req.body;

  try {
    if (req.file) {
      updates.avatar = req.file.id;
    }
    const updatedUser = await userService.update(id, updates);
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json("User not found");
    }
  } catch (e) {
    res.status(500).json(e.message);
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
  } catch (e) {
    res.status(500).json(e.message);
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
      res.status(401).json("password not ok");
    }
  } else {
    res.status(404).json("User not found");
  }
}

async function profile(req, res) {
  const { token } = req.cookies;
  if(token){
  // console.log(`async function profile token ${token}`)
  const userData = userService.verifyToken(token);
  const { username, email, avatar, _id } = await userService.readUserById(
    userData.id
  );
  res.json({ username, email, avatar, _id });
  }else{
    res.json(null);
  }
}

async function logout(req, res) {
  res.cookie("token", "").json(true);
}

async function getAll(req, res){
  const users= await userService.readAllUsers();
  res.json(users);
}

module.exports = { create, read, update, remove, login, profile, logout, getAll };
