const express = require("express");
const assetsController = require("../controllers/assets");

const router = express.Router();

router.get("/images", assetsController.readAllImages);
router.get("/audio", assetsController.readAllAudio);
router.get("/stickers", assetsController.readAllStickers);

module.exports = router;
