const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { uploadAvatar } = require("../middleware/uploadImagesMiddleware");
const userController = require("../controllers/users");

const router = express.Router();

router.post("/login", userController.login);
router.get("/profile", authMiddleware, userController.profile);
router.post("/logout", userController.logout);

router.get("/all", userController.getAll);

router.post("/register", uploadAvatar, userController.create);
router.get("/:id", userController.read);
router.put("/:id", authMiddleware, uploadAvatar, userController.update);
router.delete("/:id", authMiddleware, userController.remove);



module.exports = router;
