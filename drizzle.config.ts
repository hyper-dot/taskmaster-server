import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  dialect: 'mysql',
  schema: './src/**/*.model.ts',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DB_URL!,
  },
});
