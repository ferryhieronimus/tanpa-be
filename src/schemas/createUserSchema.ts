import { z, ZodSchema } from 'zod';

const createUserSchema: ZodSchema<CreateUserParams> = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(6),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string().optional(),
});

export default createUserSchema
