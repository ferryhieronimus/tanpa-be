import { z, ZodSchema } from 'zod';

const updateUserSchema: ZodSchema<UpdateUserParams> = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(6),
  email: z.string().email(),
  firstName: z.string().min(1).max(50),
  lastName: z.string().max(50).optional(),
  bio: z.string().max(140).optional(),
});

export default updateUserSchema
