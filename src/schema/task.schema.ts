import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  dueDate: z.coerce.date(),
  progress: z.enum(['todo', 'in_progress', 'completed']),
});

export type TTaskSchema = z.infer<typeof taskSchema>;
