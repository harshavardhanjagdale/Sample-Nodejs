/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *       properties:
 *         first_name:
 *           type: string
 *           description: The first name of the user.
 *         last_name:
 *           type: string
 *           description: The last name of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *   securityDefinitions:
 *     bearerAuth:
 *       type: apiKey
 *       name: authorization
 *       in: header
 */

/**
 * @swagger
 * /users/users/{id}::
 *   get:
 *     summary: Get user by ID.
 *     description: Retrieves a user by their ID provided in parameters.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Details of the requested user(s).
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 * /users/users:
 *   get:
 *     summary: Get all users or user by ID.
 *     description: Retrieves a list of all users or the details of a user by their ID provided in query parameters.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Details of the requested user(s).
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 *   post:
 *     summary: Create a new user.
 *     description: Creates a new user with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Bad request. Invalid user data provided.
 * /users/users/{id}:
 *   put:
 *     summary: Update a user by ID.
 *     description: Updates the details of a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update.
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       400:
 *         description: Bad request. Invalid user data provided.
 *       404:
 *         description: User not found.
 *   delete:
 *     summary: Delete a user by ID.
 *     description: Deletes a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to delete.
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 * /auth/login:
 *   post:
 *     summary: login user.
 *     description: user will be get logged in .
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       201:
 *         description: User logged in successfully.
 *       400:
 *         description: Bad request. Invalid user data provided.
 * /auth/signup:
 *   post:
 *     summary: signin to user .
 *     description: user will be signin.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       201:
 *         description: User signup  successfully.
 *       400:
 *         description: Bad request. Invalid user data provided.
 */
