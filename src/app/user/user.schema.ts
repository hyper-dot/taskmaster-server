import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email().max(255),
  password: z.string().min(8).max(255),
});

export type TUserSchema = z.infer<typeof userSchema>;
