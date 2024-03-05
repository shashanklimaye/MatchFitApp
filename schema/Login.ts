import { z } from 'zod';

export const LoginSchema = z.object({
    username: z.string().email({ message: "Please enter a valid email address." }).min(1, { message: "An email is required." }),
    password: z.string().min(1, { message: "A password is required." }),
});

export type Login = z.infer<typeof LoginSchema>;