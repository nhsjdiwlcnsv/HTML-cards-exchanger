const express = require("express");
const postcardController = require("../controllers/postcards");
const { uploadPostcard } = require("../middleware/uploadImagesMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Postcards
 *   description: Postcards management (create, read, update, and delete postcards).
 */

/**
 * @swagger
 * /api/postcards/owned:
 *   get:
 *     summary: Retrieve owned postcards.
 *     tags: [Postcards]
 *     description: Retrieves all postcards owned by the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of owned postcards.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/Postcard'
 *       401:
 *         description: Unauthorized, user not authenticated.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/postcards/received:
 *   get:
 *     summary: Retrieve received postcards.
 *     tags: [Postcards]
 *     description: Retrieves all postcards received by the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of received postcards.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/Postcard'
 *       401:
 *         description: Unauthorized, user not authenticated.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/postcards:
 *   post:
 *     summary: Create a new postcard.
 *     tags: [Postcards]
 *     description: Creates a new postcard.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *            $ref: '#/components/schemas/Postcard'
 *     responses:
 *       201:
 *         description: Postcard created successfully.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Postcard'
 *       400:
 *         description: Bad request, invalid data.
 *       401:
 *         description: Unauthorized, user not authenticated.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/postcards/{id}:
 *   get:
 *     summary: Retrieve a postcard by ID.
 *     tags: [Postcards]
 *     description: Retrieves a single postcard by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the postcard to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A postcard object.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Postcard'
 *       404:
 *         description: Postcard not found.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/postcards/{id}:
 *   put:
 *     summary: Update a postcard by ID.
 *     tags: [Postcards]
 *     description: Updates an existing postcard by its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the postcard to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *            $ref: '#/components/schemas/Postcard'
 *     responses:
 *       200:
 *         description: Postcard updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Postcard'
 *       400:
 *         description: Bad request, invalid data.
 *       401:
 *         description: Unauthorized, user not authenticated.
 *       404:
 *         description: Postcard not found.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/postcards/{id}:
 *   delete:
 *     summary: Delete a postcard by ID.
 *     tags: [Postcards]
 *     description: Deletes a postcard by its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the postcard to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Postcard deleted successfully.
 *       401:
 *         description: Unauthorized, user not authenticated.
 *       404:
 *         description: Postcard not found.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/postcards:
 *   get:
 *     summary: Retrieve all postcards.
 *     tags: [Postcards]
 *     description: Retrieves a list of all postcards.
 *     responses:
 *       200:
 *         description: A list of all postcards.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/Postcard'
 *       500:
 *         description: Server error.
 */

router.get("/owned", authMiddleware, postcardController.owned);
router.get("/received", authMiddleware, postcardController.received);

router.post("/", authMiddleware, uploadPostcard, postcardController.create);
router.get("/:id", postcardController.readPostcardById);
router.put("/:id", authMiddleware, uploadPostcard, postcardController.update);
router.delete("/:id", authMiddleware, postcardController.remove);

router.get("/", postcardController.readAllPostcards);

module.exports = router;
