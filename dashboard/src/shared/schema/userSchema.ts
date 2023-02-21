import { z } from 'zod';


export const userLoginSchema = z.object({
  email: z.string().email({ message: 'Please provide valid email' }),
  password: z.string().min(1, { message: "Please provide password" })
});


export type UserLoginType = z.infer<typeof userLoginSchema>;