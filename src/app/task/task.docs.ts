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

/**
 * @swagger
 * /task:
 *   get:
 *     summary: Retrieve tasks for a specific user
 *     description: Retrieves a list of tasks for a specific user with optional filters for progress and searchQuery.
 *     tags: [Task]
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [dueDate, title, progress]
 *         description: Sort tasks
 *       - in: query
 *         name: progress
 *         schema:
 *           type: string
 *           enum: [todo, in_progress, completed]
 *         description: Filter tasks by their current progress status
 *         example: in_progress
 *       - in: query
 *         name: searchQuery
 *         schema:
 *           type: string
 *         description: Filter tasks by title or description containing this search query
 *         example: project
 *     responses:
 *       200:
 *         description: A list of tasks for the user, optionally filtered by progress or search query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the task
 *                     example: 1
 *                   title:
 *                     type: string
 *                     description: The title of the task
 *                     example: Complete project proposal
 *                   description:
 *                     type: string
 *                     description: The detailed description of the task
 *                     example: Draft and finalize the Q3 project proposal document
 *                   progress:
 *                     type: string
 *                     description: The current progress of the task
 *                     enum: [todo, in_progress, completed]
 *                     example: in_progress
 *                   dueDate:
 *                     type: string
 *                     format: date-time
 *                     description: The due date and time of the task
 *                     example: 2024-12-31T23:59:59Z
 *                   userId:
 *                     type: integer
 *                     description: The ID of the user to whom the task belongs
 *                     example: 1
 *       400:
 *         $ref: '#/components/responses/400'
 *       500:
 *         $ref: '#/components/responses/500'
 */
