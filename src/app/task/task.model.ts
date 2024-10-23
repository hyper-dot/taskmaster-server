import {
  mysqlTable,
  serial,
  text,
  varchar,
  int,
  timestamp,
} from 'drizzle-orm/mysql-core';
import { userTable } from '../user/user.model';

export const taskTable = mysqlTable('tasks', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  progress: varchar('progress', { length: 20 }).notNull().default('todo'),
  dueDate: timestamp('due_date').notNull(),
  userId: int('user_id')
    .notNull()
    .references(() => userTable.id), // Ensure this references correctly
});

// Define proper types using drizzle's inference
export type Task = typeof taskTable.$inferSelect; // Type for selecting tasks
export type NewTask = typeof taskTable.$inferInsert & {
  progress: string;
};
