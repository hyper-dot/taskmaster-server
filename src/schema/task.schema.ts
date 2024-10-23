import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  dueDate: z.coerce.date(),
  progress: z.enum(['todo', 'in_progress', 'completed']),
});

export const taskFilterSchema = z.object({
  progress: z.enum(['todo', 'in_progress', 'completed']).optional(),
  searchQuery: z.string().optional(),
  sortBy: z.enum(['dueDate', 'title', 'progress']).optional(),
});

export type TTaskSchema = z.infer<typeof taskSchema>;
export type TTaskFilterSchema = z.infer<typeof taskFilterSchema>;
