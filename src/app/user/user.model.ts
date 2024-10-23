import { int, mysqlTable, serial, text, varchar } from 'drizzle-orm/mysql-core';

export const userTable = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  name: text('name').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  hash: text('hash').notNull(),
  refresh_token: text('refresh_token').notNull(),
});
