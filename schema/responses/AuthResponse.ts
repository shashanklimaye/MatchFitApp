import { z } from 'zod';
import { Role } from '../../constants/enums';

export const AuthResponseSchema = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    role: z.nativeEnum(Role),
    token: z.string(),
    username: z.string().email(),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;
