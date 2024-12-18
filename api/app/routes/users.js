const express = require("express");
const userController = require("../controllers/users");

const router = express.Router();

router.post("/login", userController.login);
router.get("/profile", userController.profile);
router.post("/logout", userController.logout);

router.post("/register", userController.create);
router.get("/:id", userController.read);
router.put("/:id", userController.update);
router.delete("/:id", userController.remove);

module.exports = router;
