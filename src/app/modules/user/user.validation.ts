import { z } from 'zod';
import { USER_ROLE } from './user.constant';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string().regex(/^\+?[0-9]{10,14}$/), // regex for phone number
    role: z.enum(Object.keys(USER_ROLE) as [string, ...string[]]),
    address: z.string().min(10).max(100),
  }),
});

export const UserValidations = {
  userValidationSchema,
};
