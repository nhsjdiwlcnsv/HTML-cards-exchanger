const express = require("express");
const postcardController = require("../controllers/postcards");
const { uploadPostcard } = require("../middleware/uploadImagesMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/owned", authMiddleware, postcardController.owned);
router.get("/received", authMiddleware, postcardController.received);

router.post("/", authMiddleware, uploadPostcard, postcardController.create);
router.get("/:id", postcardController.readPostcardById);
router.put("/:id", authMiddleware, uploadPostcard, postcardController.update);
router.delete("/:id", authMiddleware, postcardController.remove);

router.get("/", postcardController.readAllPostcards);

module.exports = router;
