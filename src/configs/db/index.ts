import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

export async function db() {
  const connection = await mysql.createConnection({
    uri: process.env.DB_URL,
  });

  return drizzle({ client: connection });
}
