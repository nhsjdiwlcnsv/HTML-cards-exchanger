const express = require("express");
const assetsController = require("../controllers/assets");

const router = express.Router();

router.get("/avatars/:id", assetsController.getAvatar);
router.get("/images/:id", assetsController.getImage);
/**
 * @swagger
 * tags:
 *   name: Assets
 *   description: "Assets management: images, audio, and stickers."
 */

/**
 * @swagger
 * /api/assets/images:
 *   get:
 *     summary: Retrieve all image files.
 *     tags: [Assets]
 *     description: Returns all image files metadata.
 *     responses:
 *       200:
 *         description: A list of image files.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Unique identifier of the file.
 *                   filename:
 *                     type: string
 *                     description: Name of the file.
 *                   contentType:
 *                     type: string
 *                     description: MIME type of the file.
 *                   length:
 *                     type: integer
 *                     description: Size of the file in bytes.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/assets/audio:
 *   get:
 *     summary: Retrieve all audio files.
 *     tags: [Assets]
 *     description: Returns all audio files metadata.
 *     responses:
 *       200:
 *         description: A list of audio files.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Unique identifier of the file.
 *                   filename:
 *                     type: string
 *                     description: Name of the file.
 *                   contentType:
 *                     type: string
 *                     description: MIME type of the file.
 *                   length:
 *                     type: integer
 *                     description: Size of the file in bytes.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/assets/stickers:
 *   get:
 *     summary: Retrieve all sticker files.
 *     tags: [Assets]
 *     description: Returns all sticker files metadata.
 *     responses:
 *       200:
 *         description: A list of sticker files.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Unique identifier of the file.
 *                   filename:
 *                     type: string
 *                     description: Name of the file.
 *                   contentType:
 *                     type: string
 *                     description: MIME type of the file.
 *                   length:
 *                     type: integer
 *                     description: Size of the file in bytes.
 *       500:
 *         description: Server error.
 */

router.get("/images", assetsController.readAllImages);
router.get("/audio", assetsController.readAllAudio);
router.get("/stickers", assetsController.readAllStickers);

module.exports = router;
