const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controllers/users");

const router = express.Router();

router.post("/login", userController.login);
router.get("/profile", authMiddleware, userController.profile);
router.post("/logout", authMiddleware, userController.logout);

router.post("/register", userController.create);
router.get("/:id", userController.read);
router.put("/:id", userController.update);
router.delete("/:id", authMiddleware, userController.remove);

module.exports = router;
