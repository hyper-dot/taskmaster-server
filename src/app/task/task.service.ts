// task.service.ts
import { NewTask } from './task.model';
import { userTable } from '../user/user.model';
import { taskTable } from './task.model';
import { connectdb } from '../../configs/db';
import { eq } from 'drizzle-orm';
import { BadRequestError } from '../../utils/exceptions';
import { TTaskFilterSchema, taskSchema } from '../../schema/task.schema';

import { and, or, like, asc, desc } from 'drizzle-orm';

export default class TaskService {
  async createTask(task: NewTask, userId: number) {
    const { db, connection } = await connectdb();
    const { data, success } = taskSchema.safeParse(task);

    if (!success) throw new BadRequestError('Invalid data');

    // Check if user exists
    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, userId))
      .execute();

    if (!user) throw new BadRequestError('User not found');

    // Create task using the correct type
    const [insertResult] = await db
      .insert(taskTable)
      //@ts-ignore
      .values({
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        progress: data.progress,
        userId,
      })
      .$returningId();
    await connection.end();
    return insertResult;
  }

  async getTasks(userId: number, filters?: TTaskFilterSchema) {
    const { db, connection } = await connectdb();

    // Build conditions array
    const conditions = [eq(taskTable.userId, userId)];

    // Add filters to conditions if provided
    if (filters) {
      if (filters.progress) {
        conditions.push(eq(taskTable.progress, filters.progress));
      }

      if (filters.searchQuery) {
        conditions.push(
          or(
            like(taskTable.title, `%${filters.searchQuery}%`),
            like(taskTable.description, `%${filters.searchQuery}%`),
          ),
        );
      }
    }

    const orderByClause = [];
    if (filters?.sortBy) {
      const sortField = taskTable[filters.sortBy];
      orderByClause.push(asc(sortField));
    } else {
      orderByClause.push(desc(taskTable.dueDate));
    }

    const tasks = await db
      .select()
      .from(taskTable)
      .where(and(...conditions))
      .orderBy(...orderByClause)
      .execute();
    await connection.end();

    return tasks;
  }

  async updateTask(userId: number, taskId: number, updates: Partial<NewTask>) {
    const { db, connection } = await connectdb();

    // Validate update data
    const { data, success } = taskSchema.partial().safeParse(updates);
    if (!success) throw new BadRequestError('Invalid update data');

    // First find the task and verify ownership
    const [existingTask] = await db
      .select()
      .from(taskTable)
      .where(and(eq(taskTable.id, taskId), eq(taskTable.userId, userId)))
      .execute();

    if (!existingTask) throw new BadRequestError('Task not found');

    // Only include fields that exist in the table schema
    await db.update(taskTable).set(data).where(eq(taskTable.id, taskId));

    // Fetch and return the updated task
    const [updatedTask] = await db
      .select()
      .from(taskTable)
      .where(eq(taskTable.id, taskId))
      .execute();
    await connection.end();

    return updatedTask;
  }

  async deleteTask(userId: number, taskId: number) {
    const { db, connection } = await connectdb();

    // First find the task and verify ownership
    const [task] = await db
      .select()
      .from(taskTable)
      .where(and(eq(taskTable.id, taskId), eq(taskTable.userId, userId)))
      .execute();

    await connection.end();

    if (!task) throw new BadRequestError('Task not found');

    // Delete the task
    await db.delete(taskTable).where(eq(taskTable.id, taskId)).execute();
  }
}
