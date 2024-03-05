import { z } from 'zod';
import { Role } from '../constants/enums';

export const AccountSchema = z.object({
    id: z.number().optional(),
    username: z.string().email({message:"Please enter a valid email address."}).min(1, { message: "An email is required." }),
    password: z.string().min(1, { message: "A password is required." }),
    role: z.nativeEnum(Role).default(Role.Instructor),
    firstName: z.string().min(1, { message: "A name is required." }),
    surname: z.string(),
});

export type Account = z.infer<typeof AccountSchema>;
