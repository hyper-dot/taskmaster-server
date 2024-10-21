/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API for managing users
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Log in a user by providing an email and password. Returns access and refresh tokens.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "mySuperSecurePassword123"
 *     responses:
 *       201:
 *         $ref: '#/components/responses/201'
 *       400:
 *         $ref: '#/components/responses/400'
 *       500:
 *         $ref: '#/components/responses/500'
 */
