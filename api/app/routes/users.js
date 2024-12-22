const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { uploadAvatar } = require("../middleware/uploadImagesMiddleware");
const userController = require("../controllers/users");

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     description: Register a new user with a username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Desired username.
 *                 example: user123
 *               email:
 *                 type: string
 *                 description: User's email
 *                 example: user@mail.com
 *               password:
 *                 type: string
 *                 description: Password for the user.
 *                 example: securepassword
 *     responses:
 *       200:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID of the newly created user.
 *                 username:
 *                   type: string
 *                   description: Username of the new user.
 *                 email:
 *                 type: string
 *                 description: Email of the new user.
 *       422:
 *         description: Validation error (e.g., username already taken).
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     description: Log in a user using their username and password, and receive a token in the response cookie.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username.
 *                 example: user123
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: securepassword
 *     responses:
 *       200:
 *         description: Login successful, returns user details and sets a token cookie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: User ID.
 *                 username:
 *                   type: string
 *                   description: Username.
 *       404:
 *         description: User not found.
 *       422:
 *         description: Incorrect password.
 */

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     description: Retrieve the profile of the currently logged-in user using the token in cookies.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the user's profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 _id:
 *                   type: string
 *       401:
 *         description: Unauthorized (e.g., no or invalid token).
 */

/**
 * @swagger
 * /api/user/logout:
 *   post:
 *     summary: Log out the user
 *     tags: [Users]
 *     description: Log out the user by clearing the token cookie.
 *     responses:
 *       200:
 *         description: Logout successful.
 */

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     description: Retrieve details of a user by their ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 username:
 *                   type: string
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Update user information
 *     tags: [Users]
 *     description: Update details of a user by their ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: New username (optional).
 *               password:
 *                 type: string
 *                 description: New password (optional).
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 username:
 *                   type: string
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     description: Remove a user from the database by their ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */

router.post("/login", userController.login);
router.get("/profile", authMiddleware, uploadAvatar, userController.profile);
router.post("/logout", authMiddleware, userController.logout);

router.post("/register", uploadAvatar, userController.create);
router.get("/:id", userController.read);
router.put("/:id", authMiddleware, uploadAvatar, userController.update);
router.delete("/:id", authMiddleware, userController.remove);

module.exports = router;
