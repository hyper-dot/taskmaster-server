import { mysqlTable, serial, text, varchar } from 'drizzle-orm/mysql-core';

export const userTable = mysqlTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  hash: text('hash').notNull(),
  refreshToken: text('refresh_token'),
});
