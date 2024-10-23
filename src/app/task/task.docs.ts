/**
 * @swagger
 * tags:
 *   name: Task
 *   description: API for managing tasks
 */

/**
 * @swagger
 * tags:
 *   name: Task
 *   description: API for managing tasks
 */
/**
 * @swagger
 * /task:
 *   post:
 *     summary: Create a new task
 *     description: Creates a new task with title, description, and due date.
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - dueDate
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task
 *                 minLength: 3
 *                 maxLength: 255
 *                 example: Complete project proposal
 *               description:
 *                 type: string
 *                 description: Detailed description of the task
 *                 minLength: 3
 *                 maxLength: 255
 *                 example: Draft and finalize the Q3 project proposal document
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 description: Due date and time for the task (ISO 8601 format)
 *                 example: 2024-12-31T23:59:59Z
 *               progress:
 *                 type: string
 *                 description: Current status of the task
 *                 enum: [todo, in_progress, completed]
 *                 default: todo
 *                 example: todo
 *     responses:
 *       201:
 *         $ref: '#/components/responses/201'
 *       400:
 *         $ref: '#/components/responses/400'
 *       500:
 *         $ref: '#/components/responses/500'
 */
