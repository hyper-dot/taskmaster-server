// task.service.ts
import { NewTask } from './task.model';
import { userTable } from '../user/user.model';
import { taskTable } from './task.model';
import { connectdb } from '../../configs/db';
import { eq } from 'drizzle-orm';
import { BadRequestError } from '../../utils/exceptions';
import { taskSchema } from '../../schema/task.schema';

export default class TaskService {
  async createTask(task: NewTask, userId: number) {
    const { db } = await connectdb();
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

    return insertResult;
  }
}
